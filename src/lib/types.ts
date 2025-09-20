import type { OpenAPIHono, RouteConfig, RouteHandler } from "@hono/zod-openapi";
import type { PinoLogger } from "hono-pino";

import type { auth } from "./auth";

interface AppBindings {
  Variables: {
    user: typeof auth.$Infer.Session.user | null;
    session: typeof auth.$Infer.Session.session | null;
    logger: PinoLogger;
  };
}

type AppOpenAPI = OpenAPIHono<AppBindings>;

type AppRouteHandler<R extends RouteConfig> = RouteHandler<R, AppBindings>;

export type { AppBindings, AppOpenAPI, AppRouteHandler };
