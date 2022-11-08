import { Request, Response, NextFunction, Router } from "express";

import UserSchema from "../../models/user.model";

const GetCreateUserPage = async (req: Request, res: Response): Promise<void> => {
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

const GetUsers = async (req: Request, res: Response): Promise<void> => {
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

export = {
  // CreateUser,
  GetUsers,
  GetCreateUserPage,
};
