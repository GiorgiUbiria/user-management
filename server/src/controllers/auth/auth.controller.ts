import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../../models/user.model";
import config from "../../config/config";

const Login = async (req: Request, res: Response): Promise<any> => {
  const cookies = req.cookies;

  const { email, password } = req.body;
  if (!email || !password)
    return res
      .status(400)
      .json({ message: "Email and password are required." });

  const foundUser = await User.findOne({ email });

  if (!foundUser) return res.sendStatus(401); // Unauthorized
  // evaluate password
  const match = await foundUser.comparePassword(password);

  if (match) {
    const roles = Object.values(foundUser.role).filter(Boolean);
    // create JWTs
    const accessToken = jwt.sign(
      {
        UserInfo: {
          email: foundUser.email,
          roles,
        },
      },
      config.ACCESS_TOKEN_SECRET,
      { expiresIn: "10m" }
    );

    const newRefreshToken = jwt.sign(
      { email: foundUser.email },
      config.REFRESH_TOKEN_SECRET,
      { expiresIn: "2w" }
    );

    // Changed to let keyword
    let newRefreshTokenArray = !cookies?.jwt
      ? foundUser.refreshToken
      : foundUser.refreshToken.filter((rt) => rt !== cookies.jwt);

    if (cookies?.jwt) {
      /*
          Scenario added here:
              1) User logs in but never uses RT and does not logout
              2) RT is stolen
              3) If 1 & 2, reuse detection is needed to clear all RTs when user logs in
          */
      const refreshToken = cookies.jwt;
      const foundToken = await User.findOne({ refreshToken });

      // Detected refresh token reuse!
      if (!foundToken) {
        // clear out ALL previous refresh tokens
        newRefreshTokenArray = [];
      }

      res.clearCookie("jwt", {
        httpOnly: true,
      });
    }

    // Saving refreshToken with current user
    foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
    const result = await foundUser.save();

    // Creates Secure Cookie with refresh token
    res.cookie("jwt", newRefreshToken, {
      httpOnly: true,
      maxAge: 14 * 24 * 60 * 60 * 1000,
    });

    // Send authorization roles and access token to user
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

    // tslint:disable-next-line:no-console
    console.log(newUser);

    res.status(201).json({ success: `New user with email ${email} created!` });
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
};

const Logout = async (req: Request, res: Response): Promise<any> => {
  // On client, also delete the accessToken

  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(204); // No content

  const refreshToken = cookies.jwt;

  // Is refreshToken in db?
  const foundUser = await User.findOne({ refreshToken });

  if (!foundUser) {
    res.clearCookie("jwt", { httpOnly: true });
    return res.sendStatus(204);
  }

  // Delete refreshToken in db
  foundUser.refreshToken = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  const result = await foundUser.save();

  // tslint:disable-next-line:no-console
  console.log(result);

  res.clearCookie("jwt", { httpOnly: true });

  res.sendStatus(204);
};

const changeRole = async (req: Request, res: Response) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  const foundUser = (await User.findOne({ refreshToken })) as any;

  foundUser.role = "Admin";

  await foundUser.save();

  res.json(foundUser);
};

export = {
  signUp,
  Logout,
  Login,
  changeRole,
};
