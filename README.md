# Images, SBOMs, and Scanning Lab

This repository contains the starter service and deterministic tooling for Lab 3.
Open it in the provided devcontainer and follow the tasks on the course website.

The image definitions target `linux/amd64`. The supplied smoke test and checker
must therefore be run with an amd64-capable Docker daemon (the devcontainer setup
supports Docker Desktop on both Intel and Apple silicon hosts).

## Approved replacement bases

For the final image, replace only the `FROM` line in `Dockerfile` with one of
these platform-specific, digest-pinned references:

```text
node:22-bookworm-slim@sha256:a17d50af28002a160548bd4225b3cfcb12c5efcb171f79e68758f2885fb1b066
node:22-alpine@sha256:76789712cd1ae89a1225eac9077010d68987a423588042dac30446f502f1858c
```

Both bases run the unmodified service and satisfy the lab's policy under the
frozen vulnerability database. They intentionally have different operating
system package inventories.

## Finding to investigate

The vulnerable image contains more than one Critical result. Investigate the
fixable Debian-package finding for **CVE-2026-42010**; the other results are
outside this lab's scope.

## Commands

Establish the expected failing baseline:

```console
./scripts/check-lab
```

Build and smoke-test an image directly:

```console
docker build --platform linux/amd64 --file Dockerfile.vulnerable --tag lab03:vulnerable .
./scripts/smoke-test lab03:vulnerable
```

Syft and Grype are pinned in the devcontainer. Grype reads the frozen,
checksum-verified database fixture installed there and `.grype.yaml` prevents
database updates, so everyone observes the same scan results. The database
archive is stored with Git LFS; if a clone contains a small pointer file under
`fixtures/`, run `git lfs pull` before rebuilding the devcontainer.

Do not commit generated SBOMs or vulnerability reports. The only student-owned
file submitted for this lab is `Dockerfile`.
