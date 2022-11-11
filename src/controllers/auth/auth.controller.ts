import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import IUser from "../../types/user.interface.types";
import config from "../../config/config";
import issueJWT from "../../config/utils";

const getSignInPage = async (req: Request, res: Response): Promise<any> => {
  res.render("login", { layout: false, pageTitle: "Sign In" });
};

const getSignUpPage = async (req: Request, res: Response): Promise<any> => {
  res.render("sign-up", { layout: false, pageTitle: "Sign Up" });
};

const signUp = async (req: Request, res: Response): Promise<any> => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;

  const user = await User.findOne({ email });

  if (user) {
    return res.status(409).send({ message: "User already exists" });
  }

  if (!password || password < 8) {
    return res
      .status(422)
      .send({ message: "Provide password at least of length 6" });
  }

  const newUser: any | IUser = new User({
    username,
    email,
    password,
  });

  await newUser.save();

  // tslint:disable-next-line
  const jwt = issueJWT(newUser);

  res.json({
    success: true,
    user,
    token: jwt.token,
    expiresIn: jwt.expires,
  });

  res.redirect("/login");
};

const signIn = async (req: Request, res: Response): Promise<any> => {
  const email = req.body.email;
  const password = req.body.password;

  if (!req.body.email || !req.body.password) {
    return res
      .status(401)
      .send({ message: "Please fill all the fields before submitting!" });
  }

  const user: any | IUser = await User.findOne({ email });

  if (!user) {
    res.status(401).json({ success: false, message: "could not find user" });
  }

  const isValid: any = user.comparePassword(password);

  if (isValid) {
    const tokenObject = issueJWT(user);
    res.status(200).json({
      success: true,
      user,
      token: tokenObject.token,
      expiresIn: tokenObject.expires,
    });
  } else {
    res.status(401).json({ success: false, message: "cannot validate user" });
  }

  res.redirect("/users");
};

export = {
  getSignInPage,
  getSignUpPage,
  signUp,
  signIn,
};
