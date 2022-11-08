import { Document, Model, model, Schema } from "mongoose";
import userRoles from "./user.role.types";

export interface IUserType extends Document {
  accessRights: string;
}

const UserTypeSchema: Schema = new Schema({
  role: {
    type: String,
    required: true,
    default: userRoles.Standard,
    enum: userRoles,
  },
});

const UserType = model<IUserType>("UserType", UserTypeSchema);

export default UserType;
