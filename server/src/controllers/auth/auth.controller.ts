import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";

const Login = async (req: Request, res: Response): Promise<any> => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email });

  if (!foundUser) return res.sendStatus(401);

  const match = await foundUser.comparePassword(password);

  if (match) {
    const roles = Object.values(foundUser.role).filter(Boolean);

    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles,
        },
      },
      process.env.ACCESS_TOKEN_SECRET as string,
      { expiresIn: "10m" }
    );

    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      process.env.REFRESH_TOKEN_SECRET as string,
      { expiresIn: "2w" }
    );

    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken });

      if (!foundToken) {
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
      });
    }

    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    res.json({ roles, accessToken });
  } else {
    res.sendStatus(401);
  }
};

const signUp = async (req: Request, res: Response): Promise<any> => {
  const { username, email, password } = req.body;

  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const duplicate = await User.findOne({ email });

  if (duplicate) return res.sendStatus(409);

  try {
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ success: `New user with email ${email} created!` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const Logout = async (req: Request, res: Response): Promise<any> => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  const result = await foundUser.save();

  res.clearCookie("jwt", { httpOnly: true });

  res.sendStatus(204);
};

export = {
  signUp,
  Logout,
  Login,
};
