import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import IUser from "../../types/user.interface.types";
import config from "../../config/config";
import utils from "../../config/utils";

const getSignInPage = async (req: Request, res: Response): Promise<any> => {
  res.render("login", { layout: false, pageTitle: "Sign In" });
};

const getSignUpPage = async (req: Request, res: Response): Promise<any> => {
  res.render("sign-up", { layout: false, pageTitle: "Sign Up" });
};

const signUp = async (req: Request, res: Response): Promise<any> => {
  const userEmail = req.body.email;
  const userName = req.body.username;
  const userPassword = req.body.password;
  const repeatedUserPassword = req.body.repeated_password;

  if (userPassword !== repeatedUserPassword) {
    res.status(401).send({ message: "Passwords do not match!" });
  }

  const newUser = new User({
    username: userName,
    email: userEmail,
    password: userPassword,
  });

  await newUser.save();

  res.send(newUser);
};

const signIn = async (req: Request, res: Response): Promise<any> => {
  const userEmail = req.body.email;
  const userPassword = req.body.password;

  const user: any = await User.findOne({ email: userEmail }).clone();

  const isValid = await user.comparePassword(userPassword);

  if (isValid) {
    const tokenObject = utils.issueJWT(user);
    res.status(200).json({
      success: true,
      token: tokenObject.token,
      expiresIn: tokenObject.expiresIn,
    });
  } else
    res
      .status(401)
      .json({ success: false, msg: "you entered the wrong password" });

  res.status(401).json({ success: false, msg: "could not find user" });
};

export = {
  getSignInPage,
  getSignUpPage,
  signUp,
  signIn,
};
