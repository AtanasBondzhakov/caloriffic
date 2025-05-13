import { json } from "express";

import routes from "../routes.js";

export default function expressInit(app) {
    app.use(json());
    app.use(routes);
};