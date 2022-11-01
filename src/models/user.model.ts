import createHttpError from "http-errors";
import bcrypt from "bcrypt";
import mongoose, { Schema, Document } from "mongoose";

export enum UserRoles {
  Standard = "Standard",
  Admin = "Admin",
};

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: UserRoles;
  passwordConfirmation: string,
  comparePassword(this: any, candidatePassword: string): Promise<any>;
};

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
    type: String,
    enum: UserRoles,
    default: UserRoles.Standard,
    required: true,
  },
});

const comparePassword = async function(this: any, password: string | Buffer): Promise<any> {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    let errorMessage: string = "";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    throw new createHttpError.InternalServerError(errorMessage);
  }
}

UserSchema.methods.comparePassword = comparePassword;

export default mongoose.model<IUser>("User", UserSchema);
