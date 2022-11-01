/* import { Request, Response, NextFunction, Router } from "express";
import UserSchema from "../models/userSchema";

const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await UserSchema.find();
    // tslint:disable-next-line:no-console
    console.log(users);
    res.render("index", { layout: false, pageTitle: "Home", path: "/", users });
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

const addUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const userUserName: string = req.body.username;
  const userPassword: string = req.body.password;
  const userEmail: string = req.body.email;
  const userRole: string = req.body.role;

  // tslint:disable-next-line:no-console
  console.log(userUserName);
  // tslint:disable-next-line:no-console
  console.log(userEmail);

  const user = new UserSchema({
    email: userEmail,
    password: userPassword,
    username: userUserName,
    role: userRole,
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
};

export { getUsers, addUser };
 */

import { Request, Response, NextFunction, Router } from "express";
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

async function CreateUser(req: Request, res: Response): Promise<void> {
  const UserEmail = req.body.email;
  const UserName = req.body.username;
  const UserPassword = req.body.password;

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
}

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

export = { CreateUser, GetUsers, GetLoginPage, GetCreateUserPage };
