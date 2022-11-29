import { Request, Response } from "express";

import UserSchema from "../../models/user.model";

const GetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await UserSchema.find();
    res.send(users);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

export default GetUsers;
