FROM node:20.9.0-bookworm-slim@sha256:7059cd1a44e9694e6df05408fed5d56b710b2f45a8e8806b178d8c31653a48cc

WORKDIR /app

ENV NODE_ENV=production

COPY package.json package-lock.json ./
RUN npm ci --omit=dev \
    && npm cache clean --force \
    && rm -rf /usr/local/lib/node_modules/npm /usr/local/bin/npm /usr/local/bin/npx

COPY src/ ./src/

EXPOSE 8080

USER node

CMD ["node", "src/server.js"]
