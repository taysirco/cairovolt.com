import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

const ROOT = new URL('../', import.meta.url);
const SELF = 'scripts/check-repository-hygiene.mjs';
const BINARY_FILE = /\.(?:avif|bmp|gif|ico|jpe?g|png|webp|woff2?|ttf|otf|pdf|docx|xlsx|zip|gz|mp4|webm)$/i;

const stagedDeletedFiles = new Set(execFileSync(
    'git',
    ['diff', '--cached', '--name-only', '--diff-filter=D', '-z'],
    {
        cwd: ROOT,
        encoding: 'utf8',
    },
).split('\0').filter(Boolean));

// Inspect the files that would exist in the next commit. `git ls-files`
// intentionally retains staged deletions until the commit is created, so
// exclude those paths here while still including staged additions.
const trackedFiles = execFileSync('git', ['ls-files', '-z'], {
    cwd: ROOT,
    encoding: 'utf8',
}).split('\0').filter((file) => file && !stagedDeletedFiles.has(file));

const forbiddenPaths = [
    /^\.c2pa-manifests\//,
    /^\.claude\//,
    /^keyword-research\//,
    /^marketing\//,
    /^src\/data\/tests\//,
    /^src\/data\/product-tests\.ts$/,
    /^src\/components\/(?:content\/(?:ProductTestResults|TestResultsBlock)|UX\/ContentCredentialsBadge)\.tsx$/,
    /^src\/components\/home\/SocialProofStrip\.tsx$/,
    /^src\/app\/\.well-known\/(?:did\.json|jwks\.json|openid-configuration|oauth-protected-resource|http-message-signatures-directory|mcp(?:\.json|\/))\//,
    /^src\/app\/\.well-known\/(?:acp\.json|agent-card\.json|agent-skills|ai-plugin\.json|ucp)\//,
    /^src\/app\/api\/(?:admin\/(?:purge-seeded-reviews|sign-content)|v1\/(?:premium\/lab-report|verify-content))\//,
    /^src\/app\/\[locale\]\/tech-links\//,
    /^src\/data\/discovery-hub\.ts$/,
    /^src\/lib\/(?:live-fulfillment|media-verification)\.ts$/,
    /^anker-reviews-313\.xlsx$/,
    /^cairovolt-(?:blog(?:-roadmap)?|dominance-playbook|keyword-strategy)\.md$/,
    /^content-laws\.md$/,
    /^docs\/main-category-hubs-redesign-plan-ar\.md$/,
    /^public\/images\/blog\/(?:og|posts)\/cairovolt-c2pa-authentication-card\.(?:jpg|webp)$/,
    /(?:^|\/)\.env(?:\..+)?$/,
    /\.(?:pem|p12|pfx)$/i,
    /(?:^|\/)(?:service-account|serviceaccount|credentials)(?:[-_.][^/]*)?\.json$/i,
];

const contentRules = [
    { name: 'private-key material', pattern: /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/ },
    { name: 'GitHub access token', pattern: /gh[pousr]_[A-Za-z0-9]{20,}/ },
    { name: 'AWS access key', pattern: /AKIA[0-9A-Z]{16}/ },
    { name: 'Google API key', pattern: /AIza[0-9A-Za-z_-]{30,}/ },
    // "cloaking-adjacent" is excluded: it only ever appears in the
    // markdown-negotiate handler's comment explaining why that surface must
    // replay the HTML gates exactly — prose arguing AGAINST the technique.
    // Flagging it permanently would train the reader to ignore this check.
    { name: 'unsafe optimization terminology', pattern: /\b(?:RankBrain|PBN|cloaking(?!-adjacent)|bypass\s+AdBlockers?)\b/i },
];

/**
 * Reviews are checked by CONTENT, not by path.
 *
 * `src/data/reviews/` used to be a blanket forbidden path. That was correct
 * when the directory held only seeded review datasets, but every product now
 * needs a review module present for its import to resolve — the JBL rollout
 * failed in cloud build precisely because those files were gitignored — so the
 * blanket ban started firing on ~120 legitimately-tracked empty modules. A
 * check that fails on everything gets ignored, and this one was: it was
 * reporting 120 findings, which is why nobody noticed that 95 of those files
 * still contain seeded review objects with invented reviewer names and cities.
 *
 * So: an empty review module passes, and any file that actually carries review
 * objects fails loudly. Same for the barrel — it is only a problem while it
 * imports seeded data or carries the fake-persona generator.
 *
 * This matters beyond tidiness. Self-authored reviews rendered as Review or
 * AggregateRating markup are a Google merchant-policy violation, and the store
 * has a Merchant Center review in flight.
 */
const REVIEW_MODULE = /^src\/data\/reviews\/(?!_shared\.ts$).+\.ts$/;
const REVIEW_BARREL = /^src\/data\/product-reviews\.ts$/;
const REVIEW_OBJECT = /\brating:\s*\d/;
const PERSONA_GENERATOR = /\b(?:reviewerNames|egyptianCities)\b/;

const findings = [];

for (const file of trackedFiles) {
    if (forbiddenPaths.some((pattern) => pattern.test(file))) {
        findings.push({ file, rule: 'non-deployable or sensitive tracked file' });
    }

    if (REVIEW_MODULE.test(file) || REVIEW_BARREL.test(file)) {
        let reviewSource = '';
        try {
            reviewSource = readFileSync(new URL(file, ROOT), 'utf8');
        } catch {
            reviewSource = '';
        }
        const match = REVIEW_OBJECT.exec(reviewSource) || PERSONA_GENERATOR.exec(reviewSource);
        if (match) {
            findings.push({
                file,
                line: reviewSource.slice(0, match.index).split('\n').length,
                rule: 'seeded/self-authored review data — only real, order-verified reviews may ship',
            });
        }
    }

    if (file === SELF || BINARY_FILE.test(file)) continue;

    let source;
    try {
        source = readFileSync(new URL(file, ROOT), 'utf8');
    } catch {
        continue;
    }

    for (const { name, pattern } of contentRules) {
        const match = pattern.exec(source);
        if (!match) continue;
        const line = source.slice(0, match.index).split('\n').length;
        findings.push({ file, line, rule: name });
    }
}

const appHostingPath = trackedFiles.find((file) => file === 'apphosting.yaml');
if (appHostingPath) {
    const lines = readFileSync(new URL(appHostingPath, ROOT), 'utf8').split('\n');
    let currentVariable = '';

    lines.forEach((line, index) => {
        const variableMatch = line.match(/^\s*-\s+variable:\s*([A-Z0-9_]+)\s*$/);
        if (variableMatch) currentVariable = variableMatch[1];

        if (
            currentVariable
            && /(?:SECRET|TOKEN|PASSWORD|PRIVATE_KEY|API_KEY|CLIENT_SECRET)/.test(currentVariable)
            && /^\s+value:/.test(line)
        ) {
            findings.push({
                file: appHostingPath,
                line: index + 1,
                rule: `sensitive variable ${currentVariable} must use Secret Manager`,
            });
        }
    });
}

if (findings.length > 0) {
    console.error(`Repository hygiene check failed with ${findings.length} finding(s):`);
    for (const finding of findings) {
        const location = finding.line ? `${finding.file}:${finding.line}` : finding.file;
        console.error(`- ${location}: ${finding.rule}`);
    }
    process.exit(1);
}

console.log(`Repository hygiene check passed (${trackedFiles.length} tracked files inspected).`);
