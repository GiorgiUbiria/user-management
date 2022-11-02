import { Request, Response, NextFunction, Router } from "express";
import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import async from "async";
import passport from "passport";
import { IVerifyOptions } from "passport-local";
import { WriteError } from "mongodb";
import session from "express-session";
import { CallbackError } from "mongoose";
import { body, check, validationResult } from "express-validator";

import "../auth/user.auth";
import UserSchema, { IUser, UserRoles } from "../../models/user.model";

interface IUserInput {
  email: IUser["email"];
  username: IUser["username"];
  password: IUser["password"];
  role: UserRoles;
}

async function GetCreateUserPage(req: Request, res: Response): Promise<void> {
  try {
    res.render("add-user", { layout: false, pageTitle: "Add User" });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

/* async function CreateUser(req: Request, res: Response): Promise<void> {
  const UserEmail = req.body.email;
  const UserName = req.body.username;
  const UserPassword = req.body.password;
  const HashedPassword = await bcrypt.hash(UserPassword, 10);

  const user = new UserSchema({
    email: UserEmail,
    username: UserName,
    password: UserPassword,
    role: UserRoles.Standard,
  });

  try {
    const result = await user.save();
    // tslint:disable-next-line:no-console
    console.log(result);
    res.redirect("/");
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
} */

async function GetUsers(req: Request, res: Response): Promise<void> {
  try {
    const users = await UserSchema.find();
    // tslint:disable-next-line:no-console
    console.log(users);
    res.render("users-page", {
      layout: false,
      pageTitle: "Users",
      path: "/",
      users,
    });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

async function GetLoginPage(req: Request, res: Response): Promise<void> {
  try {
    res.render("login", { layout: false, pageTitle: "Login" });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

async function GetSignUpPage(req: Request, res: Response): Promise<void> {
  try {
    res.render("sign-up", { layout: false, pageTitle: "Register" });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
}

async function SignUpUser(req: Request, res: Response): Promise<void> {
  const UserEmail = req.body.email;
  const UserName = req.body.username;
  const UserPassword = req.body.password;
  const RepeatedPassword = req.body.repeated_password;
  const HashedPassword = await bcrypt.hash(UserPassword, 10);

  let errorMessage: string = "";
  if (RepeatedPassword !== UserPassword) {
    errorMessage = "Passwords do not match";
    throw new createHttpError.InternalServerError(errorMessage);
  }

  const user = new UserSchema({
    email: UserEmail,
    username: UserName,
    password: HashedPassword,
    role: UserRoles.Standard,
  });

  try {
    const result = await user.save();
    // tslint:disable-next-line:no-console
    console.log(result);
    res.redirect("/users");
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
}

const PostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password cannot be blank")
    .isLength({ min: 1 })
    .run(req);
  await body("email").normalizeEmail({ gmail_remove_dots: false }).run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect("/login");
  }

  passport.authenticate(
    "local",
    (err: Error, user: IUser, info: IVerifyOptions) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.redirect("/login");
      }
      // tslint:disable-next-line:no-shadowed-variable
      req.logIn(user, (err) => {
        if (err) {
          return next(err);
        }
        res.redirect(req.session.returnTo || "/");
      });
    }
  )(req, res, next);
};

export = {
  // CreateUser,
  GetUsers,
  GetLoginPage,
  GetCreateUserPage,
  GetSignUpPage,
  SignUpUser,
  PostLogin,
};
