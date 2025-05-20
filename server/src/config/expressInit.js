import { json } from "express";
import cookieParser from 'cookie-parser';

import routes from "../routes.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

export default function expressInit(app) {
    app.use(json());
    app.use(cookieParser());
    app.use(authMiddleware);
    app.use(routes);
};