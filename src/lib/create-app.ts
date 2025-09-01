import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";
import defaultHook from "stoker/openapi/default-hook";

import { pinoLogger } from "@/middlewares/pino-logger.js";

import type { AppBindings } from "./types.js";

function createRouter() {
  return new OpenAPIHono<AppBindings>({
    strict: false,
    defaultHook,
  });
}
function createApp() {
  const app = createRouter();

  app.use(serveEmojiFavicon("🍕"));
  app.use(pinoLogger());
  app.notFound(notFound);
  app.onError(onError);

  return app;
}

export { createRouter };
export default createApp;
