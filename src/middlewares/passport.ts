import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import User from "../models/user.model";
import IUser from "../types/user.interface.types";
import config from "../config/config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};

const JWTStrategy: Strategy = new Strategy(options, async (payload, done) => {
  // tslint:disable-next-line:no-console
  console.log("Payload: ", payload);
  User.findOne(
    { id: payload.sub },
    (err: any, user: boolean | Express.User | IUser | undefined) => {
      if (err) {
        return done(err, false);
      }
      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    }
  );
});

export default JWTStrategy;
