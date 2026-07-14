# Category-card C2PA manifests

The JSON files in this directory are truthful C2PA manifest definitions for the
final 480px and 800px category-card derivatives.

They are intentionally not embedded with c2patool's development/self-signed
credential. A self-signed claim validates its hashes but remains
`signingCredential.untrusted`, so the storefront must not present it as a
trusted Content Credential.

To embed production credentials, provide c2patool settings for a production
certificate chain. For Google recognition, the signing certificate must chain
to a CA on the C2PA Trust List; a private/local trust anchor alone is not enough:

```bash
C2PA_SIGNING_SETTINGS=/secure/cairovolt-c2pa.toml npm run assets:categories
```

After signing, the pipeline reads the embedded manifest back and refuses to
publish any output with a validation failure, including
`signingCredential.untrusted`, or without the
`signingCredential.trusted` validation result. The original product asset is
also attached as the parent ingredient, and failures in `ingredientDeltas` or
legacy `validation_status` are rejected too. Final trust is still determined
by the consumer's own trust store.

Until such a credential is supplied, the WebP files are intentionally unsigned
and these JSON files are manifest-ready definitions only.

These manifests record source-brand association and CairoVolt's derivative
preparation role, but intentionally do not assert who owns the underlying
copyright. C2PA can attest provenance and integrity; it does not by itself prove
copyright ownership or grant a reuse license.

The pipeline never writes camera model or GPS capture coordinates. These files
are resized/composited category artwork, not original camera captures.
