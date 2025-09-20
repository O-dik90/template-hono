import { OpenAPIHono } from "@hono/zod-openapi";
import { cors } from "hono/cors";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import defaultHook from "stoker/openapi/default-hook";

import { pinoLogger } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types.js";

import { auth } from "./auth.js";

function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}
function createApp() {
  const app = createRouter();

  app.use(
    "/api/auth/*", // or replace with "*" to enable cors for all routes
    cors({
      origin: "http://localhost:9999", // replace with your origin
      allowHeaders: ["Content-Type", "Authorization"],
      allowMethods: ["POST", "GET", "OPTIONS"],
      exposeHeaders: ["Content-Length"],
      maxAge: 600,
      credentials: true,
    }),
  );
  app.on(["POST", "GET"], "/api/auth/*", (c) => {
    return auth.handler(c.req.raw);
  });

  app.use(serveEmojiFavicon("🍕"));
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export { createRouter };
export default createApp;
