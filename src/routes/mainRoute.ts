import { Request, Response, NextFunction, Router } from "express";

import mainController from "../controllers/api/mainController";

const mainRoute = Router();

mainRoute.get("/", mainController);

export default mainRoute;
