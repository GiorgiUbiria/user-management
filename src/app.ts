import express, { Request, Response, NextFunction, Application } from "express";
import session from "express-session";
import passport from "passport";
import MongoStore from "connect-mongo";
import flash from "connect-flash";
import morgan from "morgan";
import createHttpError from "http-errors";
import bodyParser from "body-parser";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import { config } from "dotenv";

import errorHandler from "./middlewares/errorHandler";
import UserRouter from "./routes/userRoutes";
import AuthRouter from "./routes/authRoutes";

config();

const app: Application = express();

app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    cookie: {},
    name: "sessionName",
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
  })
);

app.use(passport.initialize());

app.use(passport.session());

// tslint:disable-next-line:no-var-requires
require("./middlewares/passport.standard")

app.use(morgan("dev"));

app.use(flash());

app.use(bodyParser.json());

// app.use(bodyParser.urlencoded({ extended: true }));

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
