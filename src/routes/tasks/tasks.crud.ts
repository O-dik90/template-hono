import { eq } from "drizzle-orm";
import * as HttpStatusCode from "stoker/http-status-codes";
import * as HttpStatusPhrases from "stoker/http-status-phrases";

import type { AppRouteHandler } from "@/lib/types";

import db from "@/db";
import { tasks } from "@/db/schema/tasks";
import { ZOD_ERROR_CODES, ZOD_ERROR_MESSAGES } from "@/lib/constants";

import type { CreateRoute, DeleteItemRoute, GetItemRoute, ListRoute, UpdateItemRoute } from "./tasks.router";

const get_list: AppRouteHandler<ListRoute> = async (c) => {
  const res = await db.query.tasks.findMany();

  return c.json(res, HttpStatusCode.OK);
};

const create: AppRouteHandler<CreateRoute> = async (c) => {
  const body = c.req.valid("json");
  await db.insert(tasks).values(body).returning();

  return c.json({
    msg: "success created",
  }, HttpStatusCode.CREATED);
};

const get_item: AppRouteHandler<GetItemRoute> = async (c) => {
  const { id } = c.req.valid("param");

  const res = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });

  if (!res) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCode.NOT_FOUND,
    );
  }

  return c.json(
    {
      ...res,
      created_at: res.created_at ? res.created_at.toISOString() : null,
      updated_at: res.updated_at ? res.updated_at.toISOString() : null,
    },
    HttpStatusCode.OK,
  );
};

const update_item: AppRouteHandler<UpdateItemRoute> = async (c) => {
  const { id } = c.req.valid("param");
  const updates = c.req.valid("json");

  if (!id) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCode.NOT_FOUND,
    );
  }

  if (Object.keys(updates).length === 0) {
    return c.json(
      {
        success: false,
        error: {
          issues: [
            {
              code: ZOD_ERROR_CODES.INVALID_UPDATES,
              path: [],
              message: ZOD_ERROR_MESSAGES.NO_UPDATES,
            },
          ],
          name: "ZodError",
        },
      },
      HttpStatusCode.UNPROCESSABLE_ENTITY,
    );
  }

  const [res] = await db.update(tasks)
    .set(updates)
    .where(eq(tasks.id, id))
    .returning();

  if (!res) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCode.NOT_FOUND,
    );
  }

  return c.json({
      ...res,
      created_at: res.created_at ? res.created_at.toISOString() : null,
      updated_at: res.updated_at ? res.updated_at.toISOString() : null,
    }, HttpStatusCode.OK);
};

const remove_item: AppRouteHandler<DeleteItemRoute> = async (c) => {
  const {id} = c.req.valid("param")
  const exist = await db.query.tasks.findFirst({
    where(fields, operators) {
      return operators.eq(fields.id, id);
    },
  });


  if (!id || !exist) {
    return c.json(
      { message: HttpStatusPhrases.NOT_FOUND },
      HttpStatusCode.NOT_FOUND,
    );
  }

  const res = await db.delete(tasks).where(eq(tasks?.id, id))

  if (!res) {
    return c.json(
      {
        message: HttpStatusPhrases.NOT_FOUND,
      },
      HttpStatusCode.NOT_FOUND,
    );
  }

  return c.json(
    {
      msg: "success delete"
    },
    HttpStatusCode.OK
  )
}

export { create, get_item, get_list, remove_item, update_item };
