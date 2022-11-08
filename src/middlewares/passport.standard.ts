import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";

import User from "../models/user.model";

const Strategy = new LocalStrategy(
  { usernameField: "email", passwordField: "password" },
  (email, password, done) => {
    User.findOne(
      { email },
      (err: any, user: { verifyPassword: (arg0: string) => any }) => {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false);
        }
        if (!user.verifyPassword(password)) {
          return done(null, false);
        }
        return done(null, user);
      }
    );
    User.authenticate();
  }
);

passport.use(Strategy);

passport.serializeUser((user: Express.User, done) => {
  done(null, user);
});

passport.deserializeUser((id, done) => {
  User.findById(
    id,
    (err: any, user: boolean | Express.User | null | undefined) => {
      done(err, user);
    }
  );
});


export default passport;