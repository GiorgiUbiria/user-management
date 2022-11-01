import passport from "passport";
import PassportLocal from "passport-local";
import flash from "express-flash";
import UserSchema, { IUser, UserRoles } from "../../models/user.model";

const LocalStrategy = PassportLocal.Strategy;

declare global {
  namespace Express {
    interface User {
      username: string;
      id?: string;
    }
  }
}

interface IUserInput {
  email: IUser["email"];
  username: IUser["username"];
  password: IUser["password"];
  role: UserRoles;
}

passport.use(
  new LocalStrategy(
    { usernameField: "email", passwordField: "password" },
    async (email, password, done) => {
      try {
        const user = await UserSchema.findOne({ email });
        if (!user) {
          return done(null, false, {
            message: "Username/Email is not registered",
          });
        }

        const isMatch: boolean = await user.comparePassword(password);

        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect Password" });
        }
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.serializeUser((user: Express.User, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  UserSchema.findById(id, (err: any, user: Express.User) => {
    done(err, user);
  });
});

export * from "./user.auth";