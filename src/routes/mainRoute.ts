import { Request, Response, NextFunction, Router } from "express";

import mainController from "../controllers/mainController";

const mainRoute = Router();

mainRoute.get("/", mainController);

export default mainRoute;
