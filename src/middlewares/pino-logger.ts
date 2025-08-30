import { pinoLogger } from 'hono-pino'
import pino from 'pino'
import pretty from "pino-pretty";

import env from "@/env.js";

function logger() {

  return pinoLogger({
    pino: pino({
      level: "info",
      timestamp: pino.stdTimeFunctions.unixTime, // hh:mm:ss
    }, env.NODE_ENV === "production" ? undefined : pretty()),
  })
}

export default logger
