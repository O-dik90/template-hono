import { createRoute } from "@hono/zod-openapi";
import * as HttpStatusCodes from "stoker/http-status-codes";
import { jsonContent } from "stoker/openapi/helpers";
import { createMessageObjectSchema } from "stoker/openapi/schemas";

import { createRouter } from "@/lib/create-app";
import { protect } from "@/middlewares/protect";

const router = createRouter()
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      path: "/",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Tasks API"),
          "Tasks API Index",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Hono API with Better Auth",
      }, HttpStatusCodes.OK);
    },
  )
  .openapi(
    createRoute({
      tags: ["Index"],
      method: "get",
      middleware: protect,
      path: "/protect",
      responses: {
        [HttpStatusCodes.OK]: jsonContent(
          createMessageObjectSchema("Success Create Endpoint Protect"),
          "Endpoint Protect",
        ),
      },
    }),
    (c) => {
      return c.json({
        message: "Success Protect Endpoint",
      }, HttpStatusCodes.OK);
    },
  );

export default router;
