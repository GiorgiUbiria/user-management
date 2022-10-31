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

import UserSchema, { IUser } from "../models/user.model";

interface ICreateUserInput {
  email: IUser["email"];
  username: IUser["username"];
  password: IUser["password"];
  role: IUser["role"];
}

async function CreateUser({
  email,
  username,
  password,
  role,
}: ICreateUserInput): Promise<IUser> {
  return UserSchema.create({
    email,
    username,
    password,
    role,
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default { CreateUser };
