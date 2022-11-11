import { Document } from "mongoose";
import Role from "../types/user.role.types";

export default interface IUser extends Document {
  email: string;
  username: string;
  password: string;
  role: Role;
  comparePassword: (password: string) => Promise<boolean>;
}
