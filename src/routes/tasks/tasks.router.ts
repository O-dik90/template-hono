import { createRoute, z } from "@hono/zod-openapi";
import * as HttpStatusCode from "stoker/http-status-codes";
import { jsonContent, jsonContentRequired } from "stoker/openapi/helpers";
import { createErrorSchema, IdParamsSchema } from "stoker/openapi/schemas";

import { createTaskSchema, messageSchema, selectTasksSchema, updateTasksSchema } from "@/db/schema/tasks";
import { notFoundSchema } from "@/lib/constants";
import { protect } from "@/middlewares/protect";

const tags = ["Tasks"];

const get_list = createRoute({
  path: "/tasks",
  method: "get",
  tags,
  middleware: protect,
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      z.array(selectTasksSchema),
      "The list of tasks",
    ),
  },
});

const create = createRoute({
  path: "/tasks",
  method: "post",
  tags,
  middleware: protect,
  request: {
    body: jsonContentRequired(
      createTaskSchema,
      "The task to create",
    ),
  },
  responses: {
    [HttpStatusCode.CREATED]: jsonContent(
      messageSchema,
      "The created task",
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(createTaskSchema),
      "The validation error(s)",
    ),
  },
});

const get_item = createRoute({
  path: "/tasks/{id}",
  method: "get",
  tags,
  middleware: protect,
  request:{
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "Get detail item",
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "item not found"
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "invalid id error"
    )
  },
});

const update_item = createRoute({
  path: "tasks/{id}",
  method: "put",
  tags,
  middleware: protect,
  request:{
    params: IdParamsSchema,
    body: jsonContent(
      updateTasksSchema,
      "item update"
    )
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      selectTasksSchema,
      "sucess update"
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "item not found"
    ),
    [HttpStatusCode.UNPROCESSABLE_ENTITY]: jsonContent(
      createErrorSchema(IdParamsSchema),
      "invalid id error"
    )
  },
})

const remove_item = createRoute({
  path: "tasks/{id}",
  method: "delete",
  tags,
  middleware: protect,
  request: {
    params: IdParamsSchema
  },
  responses: {
    [HttpStatusCode.OK]: jsonContent(
      messageSchema,
      "remove item"
    ),
    [HttpStatusCode.NOT_FOUND]: jsonContent(
      notFoundSchema,
      "item not found"
    )
  },
})

export type ListRoute = typeof get_list;
export type CreateRoute = typeof create;
export type GetItemRoute = typeof get_item;
export type UpdateItemRoute = typeof update_item;
export type DeleteItemRoute = typeof remove_item

export { create, get_item, get_list, remove_item, update_item };
