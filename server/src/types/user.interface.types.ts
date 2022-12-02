import { Document } from "mongoose";
import { Roles } from "../models/user.model";

export default interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: typeof Roles;
  refreshToken: string[];
  comparePassword: (password: string) => Promise<boolean>;
}
