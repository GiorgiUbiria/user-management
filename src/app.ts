import express, { Request, Response, NextFunction, Application } from "express";
import passport from "passport";
import logger from "morgan";
import createHttpError from "http-errors";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import path from "path";

import { config } from "dotenv";

import passportMiddleware from "./middlewares/passport";
import errorHandler from "./middlewares/errorHandler";

import UserRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRoutes";

config();

const app: Application = express();

passport.use(passportMiddleware);

app.use(passport.initialize());

app.use(cors());

app.use(logger("dev"));

app.use(cookieParser());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static("public"));

app.use(expressLayouts);

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(AuthRouter);
app.use(UserRouter);

app.use(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(new createHttpError.NotFound());
  }
);

app.use(errorHandler);

export = app;
