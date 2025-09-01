import type { OpenAPIHono } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

type AppOpenAPI = OpenAPIHono<AppBindings>;

export type {AppBindings, AppOpenAPI};