FROM anchore/syft:v1.50.0@sha256:1288ea4c8b38767b4e620c1e312c8cb26b6e887a99b4f07ab6cd19fc6f225026 AS syft
FROM anchore/grype:v0.116.1@sha256:1e71065c0a4cff3e6bd3b8add525ffac4343eb4971694eb90a31cf6d4d3e85db AS grype

FROM mcr.microsoft.com/devcontainers/javascript-node:1-22-bookworm@sha256:0d29e5fdc64f8397cd502223e0c4679f1e60877ca0fd2db4f2e2e0028e4271af

COPY --from=syft /syft /usr/local/bin/syft
COPY --from=grype /grype /usr/local/bin/grype

USER root

ARG GRYPE_DB_URL="https://grype.anchore.io/databases/v6/vulnerability-db_v6.1.9_2026-08-13T00:26:15Z_1786603170.tar.zst"
ARG GRYPE_DB_SHA256="a75a32cb52d2867a3ab01b7c5526688c8666b8422b0e89b701c55d38234fdc01"
ARG TARGETARCH

ENV GRYPE_DB_CACHE_DIR=/opt/grype-db \
    GRYPE_DB_AUTO_UPDATE=false \
    GRYPE_DB_VALIDATE_AGE=false \
    GRYPE_CHECK_FOR_APP_UPDATE=false \
    SYFT_CHECK_FOR_APP_UPDATE=false

RUN case "$TARGETARCH" in \
      amd64) \
        ZSTD_SHA256="640eba8dfc558df0da4e828860e9e81af961caad482387d1783931a3b1c53122"; \
        GIT_LFS_SHA256="4995aac84ea4b030c524d2ba28abe65346bb74ae610f231913f478f4ff6140f7" \
        ;; \
      arm64) \
        ZSTD_SHA256="97a58383b0ad55cc8183e59cbb112f2eb55c3dc1e90de816fa5cfb983d5c2ff0"; \
        GIT_LFS_SHA256="b8346d00b23c838febb391574a75ab90e2b4a49853a42ec66a5025e70558fc60" \
        ;; \
      *) printf 'Unsupported architecture: %s\n' "$TARGETARCH" >&2; exit 1 ;; \
    esac \
    && ZSTD_PACKAGE="zstd_1.5.4+dfsg2-5_${TARGETARCH}.deb" \
    && curl --fail --location --retry 3 \
      --output "/tmp/$ZSTD_PACKAGE" \
      "https://deb.debian.org/debian/pool/main/libz/libzstd/$ZSTD_PACKAGE" \
    && printf '%s  %s\n' "$ZSTD_SHA256" "/tmp/$ZSTD_PACKAGE" | sha256sum --check --strict \
    && dpkg --install "/tmp/$ZSTD_PACKAGE" \
    && rm --force "/tmp/$ZSTD_PACKAGE" \
    && GIT_LFS_PACKAGE="git-lfs_3.3.0-1+deb12u1_${TARGETARCH}.deb" \
    && curl --fail --location --retry 3 \
      --output "/tmp/$GIT_LFS_PACKAGE" \
      "https://deb.debian.org/debian/pool/main/g/git-lfs/$GIT_LFS_PACKAGE" \
    && printf '%s  %s\n' "$GIT_LFS_SHA256" "/tmp/$GIT_LFS_PACKAGE" | sha256sum --check --strict \
    && dpkg --install "/tmp/$GIT_LFS_PACKAGE" \
    && rm --force "/tmp/$GIT_LFS_PACKAGE" \
    && mkdir --parents /opt/grype-db

COPY fixtures/grype-db.tar.zst /tmp/grype-db.tar.zst

RUN printf '%s  %s\n' "$GRYPE_DB_SHA256" /tmp/grype-db.tar.zst | sha256sum --check --strict \
    && grype db import /tmp/grype-db.tar.zst \
    && rm --force /tmp/grype-db.tar.zst \
    && chmod --recursive a+rX /opt/grype-db \
    && grype db status

USER node
