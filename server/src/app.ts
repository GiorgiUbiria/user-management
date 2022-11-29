import express, { Request, Response, NextFunction, Application } from "express";
import logger from "morgan";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";

import { config } from "dotenv";

import errorHandler from "./middlewares/errorHandler";

import UserRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRoutes";

import utils from "./config/utils";

config();

const app: Application = express();

app.use(logger("dev"));

app.use(utils.credentials);

app.use(cors({ credentials: true, origin: ["http://localhost:5173"] }));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: false }));

app.use(AuthRouter);

app.use(UserRouter);

app.use(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(new createHttpError.NotFound());
  }
);

app.use(errorHandler);

export = app;
