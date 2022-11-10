/* import express from "express";
import session from "express-session";
import flash from "connect-flash";
import passport from "passport";
import MongoStore from "connect-mongo";
import { Strategy as LocalStrategy } from "passport-local";

import User, { IUser } from "../models/user.model";

type _User = IUser;

declare global {
  namespace Express {
    // tslint:disable-next-line
    interface User extends _User {
    }
  }
}

export default async function initPassportAndSessions(app: express.Application) {
  app.use(
    session({
      secret: "keyboard cat",
      resave: false,
      saveUninitialized: false,
      cookie: {},
      name: "sessionNameJajamaru",
      store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
      }),
    })
  );

  app.use(flash());

  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(User.createStrategy());
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());
  // tslint:disable-next-line:no-console
  console.log("passport and sessions loaded");
}
 */