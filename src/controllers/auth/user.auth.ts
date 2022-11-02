import { Request, Response, NextFunction } from "express";
import passport from "passport";
import PassportLocal from "passport-local";
import UserSchema, { IUser } from "../../models/user.model";

const LocalStrategy = PassportLocal.Strategy;

declare global {
  namespace Express {
    interface User {
      username: string;
      id?: string;
    }
  }
}

passport.use(
  new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
    UserSchema.findOne({ email }, (err: NativeError, user: IUser) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(undefined, false, {
          message: `Email ${email} not found.`,
        });
      }
      // tslint:disable-next-line:no-shadowed-variable
      user.comparePassword(password, (err: Error, isMatch: boolean) => {
        if (err) {
          return done(err);
        }
        if (isMatch) {
          return done(undefined, user);
        }
        return done(undefined, false, {
          message: "Invalid email or password.",
        });
      });
    });
  })
);

passport.serializeUser<any, any>((req, user, done) => {
  done(undefined, user);
});

passport.deserializeUser((id, done) => {
  UserSchema.findById(id, (err: NativeError, user: IUser) => done(err, user));
});

export const isAuthenticated = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/login");
};
