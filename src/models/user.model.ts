import mongoose, { Schema, Document } from "mongoose";

export enum UserRoles {
  Standard = "Standard",
  Admin = "Admin",
};

export interface IUser extends Document {
  email: string;
  password: string;
  username: string;
  role: string;
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

export default mongoose.model<IUser>("User", UserSchema);
