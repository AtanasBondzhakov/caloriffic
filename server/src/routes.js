import { Router } from "express";

import authController from "./controllers/authController.js";
import adminController from "./controllers/adminController.js";
import productController from "./controllers/productController.js";
import userController from "./controllers/userController.js";
import calculatorController from "./controllers/calculatorController.js";

const routes = Router();

routes.use('/auth', authController);
routes.use('/admin', adminController);
routes.use('/products', productController);
routes.use('/user', userController);
routes.use('/calculator', calculatorController);

export default routes;