import mongoose, { Schema, Document } from "mongoose"


export interface IUser extends Document {
  email: String
  firstName: String
  lastName: String
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  login: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
})

export default mongoose.model<IUser>("User", UserSchema)
