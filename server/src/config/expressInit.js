import { json } from "express";

export default function expressInit(app) {
    app.use(json());
};