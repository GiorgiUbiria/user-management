import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import config from "../config/config";

import Roles from "../types/user.role.types";
import IUser from "../types/user.interface.types";

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    Standard: {
      type: String,
      default: Roles.Standard,
    },
    Admin: String,
    Banned: String,
  },
  refreshToken: [String],
});

UserSchema.pre<IUser>("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(user.password, salt);
  user.password = hash;

  const refreshToken = jwt.sign(
    { email: user.email },
    config.REFRESH_TOKEN_SECRET,
    { expiresIn: "2w" }
  );

  user.refreshToken.push(refreshToken);

  next();
});

UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = model<IUser>("User", UserSchema);

export default User;
