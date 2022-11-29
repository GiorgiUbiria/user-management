import { Document } from "mongoose";
import Roles from "../types/user.role.types";

export default interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: typeof Roles;
  refreshToken: string[];
  comparePassword: (password: string) => Promise<boolean>;
}
