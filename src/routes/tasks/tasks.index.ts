import { createRouter } from "@/lib/create-app";

import * as crud from "./tasks.crud";
import * as routes from "./tasks.router";

const router = createRouter()
  .openapi(routes.get_list, crud.get_list)
  .openapi(routes.create, crud.create)
  .openapi(routes.get_item, crud.get_item)
  .openapi(routes.update_item, crud.update_item)
  .openapi(routes.remove_item, crud.remove_item)
;

export default router;
