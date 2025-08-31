import { pinoLogger as logger } from "hono-pino";
import pino from "pino";

import env from "@/env.js";

export function pinoLogger() {
  return logger({
    pino: pino({
      level: env.LOG_LEVEL || (env.NODE_ENV === "development" ? "debug" : "info"),
      transport: env.NODE_ENV === "development"
        ? {
            target: "pino-pretty",
            options: {
              colorize: true,
              translateTime: "SYS:standard",
              ignore: "pid,hostname",
            },
          }
        : undefined,
    }),
    http: {
      reqId: () => crypto.randomUUID(),
    },
  });
}
