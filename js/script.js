import { initMenu } from "./menu.js";
import { initCatalog } from "./catalog.js";
import { initOrder } from "./order.js";
initMenu();
initCatalog(initOrder());
