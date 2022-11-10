import {
  model,
  Schema,
  PassportLocalDocument,
  PassportLocalSchema,
} from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

import Role from "../types/user.role.types";

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
  role: {
    type: String,
    enum: Role,
    ref: "userType",
    required: true,
    default: Role.Standard,
  },
});

UserSchema.plugin(passportLocalMongoose, {
  usernameField: "email",
});

const User = model("User", UserSchema);

export default User;
