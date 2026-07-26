"use strict";
/* eslint-disable @typescript-eslint/no-require-imports -- Firebase loads this CommonJS codebase. */

const { createHash, randomUUID } = require("node:crypto");
const {
  createReadStream,
  createWriteStream,
  promises: fs,
} = require("node:fs");
const { tmpdir } = require("node:os");
const { basename, join } = require("node:path");
const { Readable } = require("node:stream");
const { finished, pipeline } = require("node:stream/promises");
const { once } = require("node:events");
const { createGzip } = require("node:zlib");
const archiver = require("archiver");
const { getApps, initializeApp } = require("firebase-admin/app");
const {
  DocumentReference,
  FieldPath,
  GeoPoint,
  Timestamp,
  getFirestore,
} = require("firebase-admin/firestore");
const { getStorage } = require("firebase-admin/storage");
const { logger } = require("firebase-functions");
const { defineSecret } = require("firebase-functions/params");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { google } = require("googleapis");

const DRIVE_OAUTH_CLIENT_ID = defineSecret("DRIVE_OAUTH_CLIENT_ID");
const DRIVE_OAUTH_CLIENT_SECRET = defineSecret("DRIVE_OAUTH_CLIENT_SECRET");
const DRIVE_OAUTH_REFRESH_TOKEN = defineSecret("DRIVE_OAUTH_REFRESH_TOKEN");

const PROJECT_ID = "gadgets-b0bdb";
const FIRESTORE_DATABASE_ID = "gadgets";
const STORAGE_BUCKET = "gadgets-b0bdb.firebasestorage.app";
const DRIVE_PARENT_FOLDER_ID = "110J9KgqNwUeIk4PcQENNWhM_-JRo_5wS";
const LEADS_SHEET_ID = "1laNmzAhUHJpkm-DTqzn0fsZxZNZ7S-Du2-_m7WFDYc8";
const SOURCE_REPOSITORY = "taysirco/cairovolt.com";
const SOURCE_BRANCH = "main";
const BACKUP_NAME_PATTERN =
  /^CairoVolt-backup-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}-EEST$/;
const INCOMPLETE_NAME_PATTERN =
  /^\.incomplete-CairoVolt-backup-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}-\d{2}-EEST$/;
const DRIVE_FOLDER_MIME = "application/vnd.google-apps.folder";
const XLSX_MIME =
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
const UPLOAD_CHUNK_BYTES = 32 * 1024 * 1024;
const RETAIN_BACKUP_COUNT = 3;
const STALE_INCOMPLETE_MS = 24 * 60 * 60 * 1000;

const firebaseApp = getApps()[0] || initializeApp();

function encodeFirestoreValue(value) {
  if (value === null || typeof value === "string" || typeof value === "boolean") {
    return value;
  }

  if (typeof value === "number") {
    if (Number.isFinite(value)) return value;
    return { __type: "number", value: String(value) };
  }

  if (typeof value === "bigint") {
    return { __type: "bigint", value: value.toString() };
  }

  if (value instanceof Timestamp) {
    return {
      __type: "timestamp",
      seconds: value.seconds,
      nanoseconds: value.nanoseconds,
    };
  }

  if (value instanceof Date) {
    return { __type: "date", value: value.toISOString() };
  }

  if (value instanceof GeoPoint) {
    return {
      __type: "geopoint",
      latitude: value.latitude,
      longitude: value.longitude,
    };
  }

  if (value instanceof DocumentReference) {
    return {
      __type: "document-reference",
      path: value.path,
      databaseId: value.firestore.databaseId || FIRESTORE_DATABASE_ID,
    };
  }

  if (Buffer.isBuffer(value) || value instanceof Uint8Array) {
    return {
      __type: "bytes",
      value: Buffer.from(value).toString("base64"),
    };
  }

  if (Array.isArray(value)) {
    return value.map(encodeFirestoreValue);
  }

  if (typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, child]) => [
        key,
        encodeFirestoreValue(child),
      ])
    );
  }

  return { __type: typeof value, value: String(value) };
}

async function writeLine(stream, value) {
  if (!stream.write(`${JSON.stringify(value)}\n`)) {
    await once(stream, "drain");
  }
}

async function exportFirestore(outputPath) {
  const database = getFirestore(firebaseApp, FIRESTORE_DATABASE_ID);
  const gzip = createGzip({ level: 9 });
  const output = createWriteStream(outputPath);
  const outputFinished = pipeline(gzip, output);
  const stats = {
    databaseId: FIRESTORE_DATABASE_ID,
    documentCount: 0,
    collectionPaths: new Set(),
  };

  async function exportCollection(collectionRef) {
    stats.collectionPaths.add(collectionRef.path);
    let lastDocument = null;

    while (true) {
      let query = collectionRef.orderBy(FieldPath.documentId()).limit(250);
      if (lastDocument) query = query.startAfter(lastDocument);
      const snapshot = await query.get();
      if (snapshot.empty) break;

      const nestedCollections = await Promise.all(
        snapshot.docs.map((document) => document.ref.listCollections())
      );

      for (let index = 0; index < snapshot.docs.length; index += 1) {
        const document = snapshot.docs[index];
        await writeLine(gzip, {
          path: document.ref.path,
          createTime: document.createTime?.toDate().toISOString() || null,
          updateTime: document.updateTime?.toDate().toISOString() || null,
          data: encodeFirestoreValue(document.data()),
        });
        stats.documentCount += 1;

        for (const nestedCollection of nestedCollections[index]) {
          await exportCollection(nestedCollection);
        }
      }

      lastDocument = snapshot.docs.at(-1);
      if (snapshot.size < 250) break;
    }
  }

  try {
    const rootCollections = await database.listCollections();
    for (const collection of rootCollections) {
      await exportCollection(collection);
    }
    gzip.end();
    await outputFinished;
  } catch (error) {
    gzip.destroy(error);
    await outputFinished.catch(() => {});
    throw error;
  }

  return {
    databaseId: stats.databaseId,
    documentCount: stats.documentCount,
    collectionCount: stats.collectionPaths.size,
    collectionPaths: [...stats.collectionPaths].sort(),
  };
}

function safeArchiveEntryName(objectName) {
  return objectName
    .split("/")
    .filter(Boolean)
    .map((part) => (part === "." || part === ".." ? encodeURIComponent(part) : part))
    .join("/");
}

async function exportStorage(outputPath) {
  const bucket = getStorage(firebaseApp).bucket(STORAGE_BUCKET);
  const output = createWriteStream(outputPath);
  const archive = archiver("zip", { zlib: { level: 9 } });
  const metadataLines = [];
  let objectCount = 0;
  let totalBytes = 0;
  let pageToken;

  archive.pipe(output);
  archive.on("warning", (error) => {
    if (error.code !== "ENOENT") archive.emit("error", error);
  });

  const archiveFinished = finished(output);

  try {
    do {
      const [files, nextQuery, apiResponse] = await bucket.getFiles({
        autoPaginate: false,
        maxResults: 500,
        pageToken,
      });

      for (const file of files) {
        const metadata = file.metadata || {};
        const size = Number(metadata.size || 0);
        const entryName = safeArchiveEntryName(file.name);
        if (!entryName) continue;

        metadataLines.push(
          JSON.stringify({
            name: file.name,
            size,
            contentType: metadata.contentType || null,
            cacheControl: metadata.cacheControl || null,
            contentDisposition: metadata.contentDisposition || null,
            contentEncoding: metadata.contentEncoding || null,
            contentLanguage: metadata.contentLanguage || null,
            crc32c: metadata.crc32c || null,
            md5Hash: metadata.md5Hash || null,
            generation: metadata.generation || null,
            metageneration: metadata.metageneration || null,
            customMetadata: metadata.metadata || null,
            timeCreated: metadata.timeCreated || null,
            updated: metadata.updated || null,
          })
        );

        archive.append(file.createReadStream(), {
          name: `objects/${entryName}`,
          date: metadata.updated ? new Date(metadata.updated) : new Date(0),
        });
        objectCount += 1;
        totalBytes += size;
      }

      pageToken = nextQuery?.pageToken || apiResponse?.nextPageToken;
    } while (pageToken);

    archive.append(`${metadataLines.join("\n")}\n`, {
      name: "_storage-metadata.ndjson",
      date: new Date(0),
    });
    await archive.finalize();
    await archiveFinished;
  } catch (error) {
    archive.abort();
    output.destroy(error);
    await archiveFinished.catch(() => {});
    throw error;
  }

  return {
    bucket: STORAGE_BUCKET,
    objectCount,
    totalObjectBytes: totalBytes,
  };
}

async function downloadResponse(response, outputPath) {
  if (!response.ok || !response.body) {
    throw new Error(`Download failed with HTTP ${response.status}.`);
  }

  await pipeline(Readable.fromWeb(response.body), createWriteStream(outputPath));
}

async function exportSourceCode(outputPath) {
  const headers = {
    Accept: "application/vnd.github+json",
    "User-Agent": "CairoVolt-Cloud-Backup",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  const commitResponse = await fetch(
    `https://api.github.com/repos/${SOURCE_REPOSITORY}/commits/${SOURCE_BRANCH}`,
    {
      headers,
      signal: AbortSignal.timeout(30_000),
    }
  );
  if (!commitResponse.ok) {
    throw new Error(`GitHub commit lookup failed with HTTP ${commitResponse.status}.`);
  }
  const commit = await commitResponse.json();
  if (!/^[0-9a-f]{40}$/i.test(commit.sha || "")) {
    throw new Error("GitHub returned an invalid commit SHA.");
  }

  const archiveResponse = await fetch(
    `https://codeload.github.com/${SOURCE_REPOSITORY}/tar.gz/${commit.sha}`,
    {
      headers: { "User-Agent": headers["User-Agent"] },
      redirect: "follow",
      signal: AbortSignal.timeout(180_000),
    }
  );
  await downloadResponse(archiveResponse, outputPath);

  return {
    repository: `https://github.com/${SOURCE_REPOSITORY}.git`,
    branch: SOURCE_BRANCH,
    commitSha: commit.sha,
  };
}

async function exportLeadsSheet(drive, outputPath) {
  const metadataResponse = await drive.files.get({
    fileId: LEADS_SHEET_ID,
    fields: "id,name,mimeType,modifiedTime",
    supportsAllDrives: true,
  });
  const exportResponse = await drive.files.export(
    {
      fileId: LEADS_SHEET_ID,
      mimeType: XLSX_MIME,
    },
    { responseType: "stream" }
  );
  await pipeline(exportResponse.data, createWriteStream(outputPath));

  return {
    fileId: metadataResponse.data.id,
    name: metadataResponse.data.name,
    sourceMimeType: metadataResponse.data.mimeType,
    modifiedTime: metadataResponse.data.modifiedTime,
    exportMimeType: XLSX_MIME,
  };
}

async function hashFile(filePath) {
  const hash = createHash("sha256");
  for await (const chunk of createReadStream(filePath)) hash.update(chunk);
  const { size } = await fs.stat(filePath);
  return { sha256: hash.digest("hex"), size };
}

function formatCairoTimestamp(date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Africa/Cairo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23",
  })
    .formatToParts(date)
    .reduce((result, part) => {
      if (part.type !== "literal") result[part.type] = part.value;
      return result;
    }, {});

  return `${parts.year}-${parts.month}-${parts.day}_${parts.hour}-${parts.minute}-${parts.second}-EEST`;
}

function driveAuth() {
  const auth = new google.auth.OAuth2(
    DRIVE_OAUTH_CLIENT_ID.value(),
    DRIVE_OAUTH_CLIENT_SECRET.value()
  );
  auth.setCredentials({ refresh_token: DRIVE_OAUTH_REFRESH_TOKEN.value() });
  return auth;
}

async function bearerToken(auth) {
  const response = await auth.getAccessToken();
  const token = typeof response === "string" ? response : response?.token;
  if (!token) throw new Error("Google OAuth did not return an access token.");
  return token;
}

async function responseError(response, operation) {
  const body = await response.text().catch(() => "");
  const summary = body.replace(/\s+/g, " ").slice(0, 500);
  return new Error(
    `${operation} failed with HTTP ${response.status}${summary ? `: ${summary}` : "."}`
  );
}

function uploadedOffset(response) {
  const range = response.headers.get("range");
  const match = /^bytes=0-(\d+)$/.exec(range || "");
  return match ? Number(match[1]) + 1 : 0;
}

async function queryUploadOffset(auth, sessionUrl, totalBytes) {
  const response = await fetch(sessionUrl, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${await bearerToken(auth)}`,
      "Content-Length": "0",
      "Content-Range": `bytes */${totalBytes}`,
    },
  });

  if (response.status === 308) return { offset: uploadedOffset(response) };
  if (response.ok) return { completed: await response.json() };
  throw await responseError(response, "Drive resumable-upload status check");
}

async function uploadFileResumable(auth, filePath, mimeType, folderId) {
  const { size } = await fs.stat(filePath);
  if (size <= 0) throw new Error(`Refusing to upload empty file ${basename(filePath)}.`);

  const initiation = await fetch(
    "https://www.googleapis.com/upload/drive/v3/files?uploadType=resumable&fields=id,name,size,md5Checksum",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${await bearerToken(auth)}`,
        "Content-Type": "application/json; charset=utf-8",
        "X-Upload-Content-Type": mimeType,
        "X-Upload-Content-Length": String(size),
      },
      body: JSON.stringify({
        name: basename(filePath),
        parents: [folderId],
        appProperties: { cairovoltBackupArtifact: "true" },
      }),
    }
  );
  if (!initiation.ok) {
    throw await responseError(initiation, "Drive resumable-upload initialization");
  }

  const sessionUrl = initiation.headers.get("location");
  if (!sessionUrl) throw new Error("Drive did not return a resumable-upload URL.");

  let offset = 0;
  while (offset < size) {
    const end = Math.min(offset + UPLOAD_CHUNK_BYTES, size) - 1;
    let uploadResponse;

    try {
      uploadResponse = await fetch(sessionUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${await bearerToken(auth)}`,
          "Content-Length": String(end - offset + 1),
          "Content-Range": `bytes ${offset}-${end}/${size}`,
        },
        body: createReadStream(filePath, { start: offset, end }),
        duplex: "half",
        signal: AbortSignal.timeout(180_000),
      });
    } catch (error) {
      logger.warn("Drive upload chunk was interrupted; checking server offset.", {
        fileName: basename(filePath),
        offset,
      });
      const status = await queryUploadOffset(auth, sessionUrl, size);
      if (status.completed) return status.completed;
      offset = status.offset;
      continue;
    }

    if (uploadResponse.status === 308) {
      offset = uploadedOffset(uploadResponse) || end + 1;
      continue;
    }
    if (uploadResponse.ok) return uploadResponse.json();

    if (uploadResponse.status >= 500 || uploadResponse.status === 429) {
      const status = await queryUploadOffset(auth, sessionUrl, size);
      if (status.completed) return status.completed;
      offset = status.offset;
      continue;
    }

    throw await responseError(uploadResponse, "Drive file upload");
  }

  const status = await queryUploadOffset(auth, sessionUrl, size);
  if (status.completed) return status.completed;
  throw new Error("Drive upload ended before the file was complete.");
}

async function listChildFolders(drive) {
  const folders = [];
  let pageToken;

  do {
    const response = await drive.files.list({
      q: `'${DRIVE_PARENT_FOLDER_ID}' in parents and mimeType = '${DRIVE_FOLDER_MIME}' and trashed = false`,
      fields: "nextPageToken,files(id,name,createdTime,appProperties)",
      orderBy: "name desc",
      pageSize: 100,
      pageToken,
      spaces: "drive",
      supportsAllDrives: true,
    });
    folders.push(...response.data.files);
    pageToken = response.data.nextPageToken;
  } while (pageToken);

  return folders;
}

async function deleteStaleIncompleteFolders(drive, now) {
  const folders = await listChildFolders(drive);
  const cutoff = now.getTime() - STALE_INCOMPLETE_MS;

  for (const folder of folders) {
    if (
      INCOMPLETE_NAME_PATTERN.test(folder.name || "") &&
      new Date(folder.createdTime || 0).getTime() < cutoff
    ) {
      await drive.files.delete({ fileId: folder.id, supportsAllDrives: true });
      logger.info("Deleted stale incomplete backup folder.", {
        folderName: folder.name,
      });
    }
  }
}

async function applyRetention(drive) {
  const folders = (await listChildFolders(drive))
    .filter((folder) => BACKUP_NAME_PATTERN.test(folder.name || ""))
    .sort((left, right) => right.name.localeCompare(left.name));

  for (const folder of folders.slice(RETAIN_BACKUP_COUNT)) {
    await drive.files.delete({ fileId: folder.id, supportsAllDrives: true });
    logger.info("Deleted expired backup folder.", { folderName: folder.name });
  }

  return Math.min(folders.length, RETAIN_BACKUP_COUNT);
}

async function verifyUploadedFiles(drive, folderId, expectedArtifacts) {
  const response = await drive.files.list({
    q: `'${folderId}' in parents and trashed = false`,
    fields: "files(id,name,size,md5Checksum)",
    pageSize: 100,
    spaces: "drive",
    supportsAllDrives: true,
  });
  const uploaded = new Map(
    response.data.files.map((file) => [file.name, Number(file.size || 0)])
  );

  for (const artifact of expectedArtifacts) {
    if (uploaded.get(artifact.name) !== artifact.size) {
      throw new Error(`Drive verification failed for ${artifact.name}.`);
    }
  }
}

async function createBackup(event) {
  const scheduledAt = new Date(event.scheduleTime || event.time || Date.now());
  const timestamp = formatCairoTimestamp(scheduledAt);
  const finalFolderName = `CairoVolt-backup-${timestamp}`;
  const incompleteFolderName = `.incomplete-${finalFolderName}`;
  const runDirectory = join(tmpdir(), `cairovolt-cloud-backup-${randomUUID()}`);
  const auth = driveAuth();
  const drive = google.drive({ version: "v3", auth });
  let incompleteFolderId = null;

  await fs.mkdir(runDirectory, { recursive: true });

  try {
    await deleteStaleIncompleteFolders(drive, new Date());
    const existing = (await listChildFolders(drive)).find(
      (folder) => folder.name === finalFolderName
    );
    if (existing) {
      const retainedBackupCount = await applyRetention(drive);
      logger.info("Scheduled backup already exists; retry completed idempotently.", {
        folderName: finalFolderName,
        retainedBackupCount,
      });
      return;
    }

    const folderResponse = await drive.files.create({
      requestBody: {
        name: incompleteFolderName,
        mimeType: DRIVE_FOLDER_MIME,
        parents: [DRIVE_PARENT_FOLDER_ID],
        appProperties: { cairovoltBackup: "true", state: "incomplete" },
      },
      fields: "id",
      supportsAllDrives: true,
    });
    incompleteFolderId = folderResponse.data.id;

    const sourcePath = join(runDirectory, "source-code.tar.gz");
    const firestorePath = join(runDirectory, "firestore-gadgets.ndjson.gz");
    const storagePath = join(runDirectory, "firebase-storage.zip");
    const leadsPath = join(runDirectory, "leads.xlsx");

    const source = await exportSourceCode(sourcePath);
    const firestore = await exportFirestore(firestorePath);
    const storage = await exportStorage(storagePath);
    const leads = await exportLeadsSheet(drive, leadsPath);

    const dataArtifacts = [];
    for (const [filePath, mimeType, description] of [
      [sourcePath, "application/gzip", "GitHub source archive at an exact commit"],
      [
        firestorePath,
        "application/gzip",
        "Typed NDJSON export of Firestore documents, including subcollections",
      ],
      [storagePath, "application/zip", "Firebase Storage objects and metadata"],
      [leadsPath, XLSX_MIME, "LEADS Google Sheet exported as XLSX"],
    ]) {
      dataArtifacts.push({
        path: filePath,
        name: basename(filePath),
        mimeType,
        description,
        ...(await hashFile(filePath)),
      });
    }

    const manifestPath = join(runDirectory, "BACKUP-MANIFEST.json");
    const manifest = {
      formatVersion: 1,
      backupName: finalFolderName,
      createdAt: new Date().toISOString(),
      scheduledAt: scheduledAt.toISOString(),
      timezone: "Africa/Cairo",
      project: { projectId: PROJECT_ID },
      source,
      firestore,
      storage,
      leads,
      integrations: {
        siteUrl: "https://cairovolt.com",
        firebaseAppHostingBackend: "naqrastore",
        driveParentFolderId: DRIVE_PARENT_FOLDER_ID,
      },
      restoreNotes: [
        "Secrets and OAuth credentials are intentionally excluded.",
        "Firestore values use explicit __type markers for lossless restoration.",
        "Storage object metadata is stored in _storage-metadata.ndjson inside the ZIP.",
      ],
      files: dataArtifacts.map(({ path, ...artifact }) => artifact),
    };
    await fs.writeFile(manifestPath, `${JSON.stringify(manifest, null, 2)}\n`, {
      mode: 0o600,
    });

    const manifestArtifact = {
      path: manifestPath,
      name: basename(manifestPath),
      mimeType: "application/json",
      description: "Backup inventory and restore metadata",
      ...(await hashFile(manifestPath)),
    };
    const artifactsBeforeChecksums = [...dataArtifacts, manifestArtifact];
    const checksumsPath = join(runDirectory, "CHECKSUMS.sha256");
    await fs.writeFile(
      checksumsPath,
      `${artifactsBeforeChecksums
        .map((artifact) => `${artifact.sha256}  ${artifact.name}`)
        .join("\n")}\n`,
      { mode: 0o600 }
    );
    const checksumsArtifact = {
      path: checksumsPath,
      name: basename(checksumsPath),
      mimeType: "text/plain",
      description: "SHA-256 checksums",
      ...(await hashFile(checksumsPath)),
    };
    const allArtifacts = [...artifactsBeforeChecksums, checksumsArtifact];

    for (const artifact of allArtifacts) {
      logger.info("Uploading backup artifact.", {
        fileName: artifact.name,
        size: artifact.size,
      });
      await uploadFileResumable(
        auth,
        artifact.path,
        artifact.mimeType,
        incompleteFolderId
      );
    }

    await verifyUploadedFiles(drive, incompleteFolderId, allArtifacts);
    await drive.files.update({
      fileId: incompleteFolderId,
      requestBody: {
        name: finalFolderName,
        appProperties: { cairovoltBackup: "true", state: "complete" },
      },
      fields: "id,name",
      supportsAllDrives: true,
    });
    incompleteFolderId = null;

    const retainedBackupCount = await applyRetention(drive);
    logger.info("Weekly CairoVolt cloud backup completed.", {
      folderName: finalFolderName,
      artifactCount: allArtifacts.length,
      firestoreDocumentCount: firestore.documentCount,
      storageObjectCount: storage.objectCount,
      retainedBackupCount,
    });
  } catch (error) {
    if (incompleteFolderId) {
      await drive.files
        .delete({ fileId: incompleteFolderId, supportsAllDrives: true })
        .catch(() => {});
    }
    logger.error("Weekly CairoVolt cloud backup failed.", {
      message: error instanceof Error ? error.message : String(error),
    });
    throw error;
  } finally {
    await fs.rm(runDirectory, { recursive: true, force: true });
  }
}

exports.weeklyCloudBackup = onSchedule(
  {
    schedule: "0 0 * * 5",
    timeZone: "Africa/Cairo",
    region: "us-central1",
    memory: "1GiB",
    timeoutSeconds: 540,
    maxInstances: 1,
    retryCount: 2,
    minBackoffSeconds: 60,
    maxBackoffSeconds: 300,
    maxRetrySeconds: 1_800,
    secrets: [
      DRIVE_OAUTH_CLIENT_ID,
      DRIVE_OAUTH_CLIENT_SECRET,
      DRIVE_OAUTH_REFRESH_TOKEN,
    ],
  },
  createBackup
);
