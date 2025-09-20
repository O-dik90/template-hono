import configOpenAPI from "@/lib/config-open-api.js";
import createApp from "@/lib/create-app.js";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index";

import { protect } from "./middlewares/protect";

const app = createApp();
configOpenAPI(app);

const routes = [
  index,
  tasks,
] as const;

routes.forEach((route) => {
  app.route("/api/v1", route);
});

app.get("/session", protect, (c) => {
  const session = c.get("session");
  const user = c.get("user");

  if (!user)
    return c.body(null, 401);

  return c.json({
    session,
    user,
  });
});

export default app;
