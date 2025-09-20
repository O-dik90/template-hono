import configOpenAPI from "@/lib/config-open-api.js";
import createApp from "@/lib/create-app.js";
import index from "@/routes/index.route";
import tasks from "@/routes/tasks/tasks.index"

const app = createApp();
configOpenAPI(app);

const routes = [
  index,
  tasks
];

routes.forEach((route) => {
  app.route("/", route);
});


export default app;
