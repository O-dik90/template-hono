import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

interface AppBindings {
  Variables: {
    logger: PinoLogger;
  };
}

type AppOpenAPI = OpenAPIHono<AppBindings>;

type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type {AppBindings, AppOpenAPI, AppRouteHandler};