import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

import { toZodV4SchemaTyped } from "@/lib/zod-utils";

export const tasks = sqliteTable("tasks", {
  id: integer({ mode: "number" })
    .primaryKey({ autoIncrement: true }),
  name: text().notNull(),
  done: integer({ mode: "boolean" })
    .notNull()
    .default(false),
  created_at: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date()),
  updated_at: integer({ mode: "timestamp" })
    .$defaultFn(() => new Date())
    .$onUpdate(() => new Date()),
});

const insertTasks = createInsertSchema(
  tasks,
  {
    name: field => field.min(1).max(500),
  },
).required({
  done: true,
}).omit({
  id: true,
  created_at: true,
  updated_at: true,
});

const message = z.object({
  msg: z.string().optional(),
});

const selectTasksSchema = toZodV4SchemaTyped(createSelectSchema(tasks));
const createTaskSchema = toZodV4SchemaTyped(insertTasks);

// @ts-expect-error partial exists on zod v4 type
const updateTasksSchema = createTaskSchema.partial();

const messageSchema = toZodV4SchemaTyped(message);
export { createTaskSchema, messageSchema, selectTasksSchema, updateTasksSchema };
