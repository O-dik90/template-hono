import type { PinoLogger } from "hono-pino";

import { OpenAPIHono } from "@hono/zod-openapi";
import { notFound, onError, serveEmojiFavicon } from "stoker/middlewares";

import { pinoLogger } from "./middlewares/pino-logger.js";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}
const app = new OpenAPIHono<AppBindings>();
app.use(serveEmojiFavicon("🍕"));
app.use(pinoLogger());

app.get("/", (c) => {
  return c.text("Hello Hono!");
});

app.get("/err", (c) => {
  c.status(422);
  throw new Error("💢 This is an error!");
});

app.notFound(notFound);
app.onError(onError);

export default app;