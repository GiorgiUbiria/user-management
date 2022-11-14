import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";

import User from "../models/user.model";
import IUser from "../types/user.interface.types";
import config from "../config/config";

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.PUB_KEY,
};

const JWTStrategy: Strategy = new Strategy(options, async (payload, done) => {
  await User.findOne({ _id: payload.sub }, (err: any, user: any) => {
    if (err) {
      return done(err, false);
    }
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  }).clone();
});

export default JWTStrategy;
