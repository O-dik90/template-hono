import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes"
import { jsonContent } from "stoker/openapi/helpers";

const tags = ["Tasks"];

const list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.object({
        tasks: z.array(
          z.object({
            id: z.string().uuid(),
            title: z.string(),
            completed: z.boolean(),
          })
        ),
      }),
      "The list of tasks"
    ),
  }
});

export type listRoute = typeof list;

export { list };