"use strict";

const http = require("node:http");
const colors = require("picocolors");

const port = Number.parseInt(process.env.PORT || "8080", 10);
const host = "0.0.0.0";

const server = http.createServer((request, response) => {
  if (request.method === "GET" && request.url === "/health") {
    response.writeHead(200, {
      "cache-control": "no-store",
      "content-type": "text/plain; charset=utf-8",
    });
    response.end("lab03 healthy\n");
    return;
  }

  response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
  response.end("not found\n");
});

server.listen(port, host, () => {
  process.stdout.write(colors.green(`lab03 service listening on ${host}:${port}\n`));
});

function shutDown() {
  server.close((error) => {
    process.exitCode = error ? 1 : 0;
  });
}

process.on("SIGINT", shutDown);
process.on("SIGTERM", shutDown);
