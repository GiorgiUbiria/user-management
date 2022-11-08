import mongoose, {
  model,
  Schema,
  PassportLocalDocument,
  PassportLocalSchema,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";
import { IUserType } from "../types/user.interface.types";

export interface IUser extends PassportLocalDocument {
  email: string;
  username: string;
  password: string;
  role: IUserType["_id"];
}

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
  role: [
    {
      type: Schema.Types.ObjectId,
      ref: "userType",
      required: true,
    },
  ],
});

UserSchema.plugin(passportLocalMongoose);

export default mongoose.model<IUser>("User", UserSchema);
