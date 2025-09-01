import configOpenAPI from "@/lib/config-open-api.js";
import createApp from "@/lib/create-app.js";
import index from "@/routes/index.route";

const app = createApp();
configOpenAPI(app);

const routes = [
  index,
];

routes.forEach((route) => {
  app.route("/", route);
});


export default app;
