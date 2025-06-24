import { Router } from "express";

import authController from "./controllers/authController.js";
import adminController from "./controllers/adminController.js";
import productController from "./controllers/productController.js";

const routes = Router();

routes.use('/auth', authController);
routes.use('/admin', adminController);
routes.use('/products', productController);

export default routes;