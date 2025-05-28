import { Router } from "express";

import authController from "./controllers/authController.js";
import adminController from "./controllers/adminController.js";

const routes = Router();

routes.use('/auth', authController);
routes.use('/admin', adminController);

export default routes;