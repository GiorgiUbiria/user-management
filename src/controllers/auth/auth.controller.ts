/* import express, { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";
import passport from "passport";
import flash from "connect-flash";
import bcrypt from "bcrypt";
import { IVerifyOptions } from "passport-local";
import { body, check, validationResult } from "express-validator";

import User, { IUser } from "../../models/user.model";

declare global {
  namespace Express {
    interface Request {
      skip: any;
    }
  }
}

// tslint:disable-next-line
const getUserParams = (body: { email: any; username: any; role: any }) => {
  return {
    email: body.email,
    username: body.username,
  };
};

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};

const GetLoginPage = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render("login", { layout: false, pageTitle: "Login" });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

const GetSignUpPage = async (req: Request, res: Response): Promise<void> => {
  try {
    res.render("sign-up", { layout: false, pageTitle: "Register" });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

const SignUpUser = async (req: Request, res: Response): Promise<void> => {
  const UserEmail = req.body.email;
  const UserName = req.body.username;
  const UserPassword = req.body.password;
  const RepeatedPassword = req.body.repeated_password;
  const HashedPassword = await bcrypt.hash(UserPassword, 10);

  if (UserPassword.length < 8) {
    req.flash(
      "error",
      "Account not created. Password must be 7+ characters long"
    );
    return res.redirect("/signup");
  }

  let errorMessage: string = "";
  if (RepeatedPassword !== UserPassword) {
    errorMessage = "Passwords do not match";
    throw new createHttpError.InternalServerError(errorMessage);
  }

  const user = new User({
    email: UserEmail,
    username: UserName,
    password: HashedPassword,
  });

  try {
    const result = await user.save();
    // tslint:disable-next-line:no-console
    console.log(result);
    res.redirect("/users");
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
    req.flash(
      "error",
      "Error creating a new account. Try a different login method."
    );
    return res.redirect("/signup");
  }
};

const PostLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  await check("email", "Email is not valid").isEmail().run(req);
  await check("password", "Password cannot be blank")
    .isLength({ min: 8 })
    .run(req);

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.redirect("/login");
  }

  // tslint:disable-next-line:no-console
  console.log(req.body);
};

export = {
  GetLoginPage,
  GetSignUpPage,
  PostLogin,
  SignUpUser,
  isAuthenticated,
};
 */