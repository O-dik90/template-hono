import { Scalar } from "@scalar/hono-api-reference";

import type { AppOpenAPI } from "./types.js";

import packageJSON from "../../package.json" with { type: "json" };

function configOpenAPI(app: AppOpenAPI) {
  app.doc("/docs", {
    openapi: "3.0.0",
    info: {
      title: "Hono with Zod and OpenAPI",
      description: "This is a sample server Hono server.",
      version: packageJSON.version,
    },
  });

  app.get(
    "/ref",
    Scalar({
      url: "/docs",
      theme: "kepler",
      layout: "classic",
      defaultHttpClient: {
        targetKey: "js",
        clientKey: "fetch",
      },
    }),
  );
}

export default configOpenAPI;
