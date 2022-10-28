import { Request, Response, NextFunction, Router } from "express";
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

  const user = new UserSchema({
    email: userEmail,
    password: userPassword,
    username: userUserName,
    role: userRole,
  });

  try {
    const result = await user.save();
    res.redirect("/");
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.log(error);
  }
};

export { getUsers, addUser };
