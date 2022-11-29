import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

import User from "../models/user.model";

import config from "./config";

declare global {
  namespace Express {
    interface Request {
      email?: Record<string, any>;
      role?: Record<string, any>;
    }
  }
}

const verifyJWT = (req: Request, res: Response, next: NextFunction) => {
  const authHeader: string =
    req.headers.authorization || (req.headers.Authorization as string);

  if (!authHeader?.startsWith("Bearer ")) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];

  // tslint:disable-next-line:no-console
  console.log(token);

  jwt.verify(token, config.ACCESS_TOKEN_SECRET, (err: any, decoded: any) => {
    if (err) return res.sendStatus(403); // invalid token
    req.email = decoded.UserInfo.email;
    req.role = decoded.UserInfo.role;
    next();
  });
};

const handleRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const cookies = req.cookies;

  if (!cookies?.jwt) return res.sendStatus(401);

  const refreshToken = cookies.jwt;

  res.clearCookie("jwt", { httpOnly: true });

  const foundUser = await User.findOne({ refreshToken });

  // Detected refresh token reuse!
  if (!foundUser) {
    jwt.verify(
      refreshToken,
      config.REFRESH_TOKEN_SECRET,
      async (err: any, decoded: any) => {
        if (err) return res.sendStatus(403); // Forbidden
        // Delete refresh tokens of hacked user
        const hackedUser: any = await User.findOne({
          email: decoded.email,
        });

        hackedUser.refreshToken = [];

        const result = await hackedUser.save();
      }
    );
    return res.sendStatus(403); // Forbidden
  }

  const newRefreshTokenArray = foundUser.refreshToken.filter(
    (rt) => rt !== refreshToken
  );

  // evaluate jwt
  jwt.verify(
    refreshToken,
    config.REFRESH_TOKEN_SECRET,
    async (err: any, decoded: any) => {
      if (err) {
        // expired refresh token
        foundUser.refreshToken = [...newRefreshTokenArray];
        // tslint:disable-next-line:no-shadowed-variable
        const result = await foundUser.save();
      }
      if (err || foundUser.username !== decoded.username)
        return res.sendStatus(403);

      // Refresh token was still valid
      const roles = Object.values(foundUser.role).filter(Boolean);

      const accessToken = jwt.sign(
        {
          UserInfo: {
            email: decoded.email,
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
      // Saving refreshToken with current user
      foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
      const result = await foundUser.save();

      // Creates Secure Cookie with refresh token
      res.cookie("jwt", newRefreshToken, {
        httpOnly: true,
        maxAge: 14 * 24 * 60 * 60 * 1000,
      });

      res.json({ roles, accessToken });
    }
  );
};

const credentials = (req: Request, res: Response, next: NextFunction) => {
  const origin = req.headers.origin;
  if (origin === "http://localhost:8080") {
    res.header("Access-Control-Allow-Credentials", true as any);
  }
  next();
};

export = {
  credentials,
  handleRefreshToken,
  verifyJWT,
};
