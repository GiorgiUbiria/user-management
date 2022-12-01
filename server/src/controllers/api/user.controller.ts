import { Request, Response } from "express";

import User from "../../models/user.model";
import IUser from "../../types/user.interface.types";

/*
  1. Add Edit and Delete Functionality for Users
  2. Refactor All Backend Code
  3. Implement Rate Limiter and Caching
*/

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<void>}
 */
export const EditUser = async (req: Request, res: Response): Promise<void> => {
  const _id = req.params.id;
  const username = req.body.username;

  try {
    const user: IUser = (await User.findByIdAndUpdate(
      _id,
      {
        username,
      },
      { new: true }
    )) as IUser;

    res.status(200).json(user);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<void>}
 */
export const DeleteUser = async (
  req: Request,
  res: Response
): Promise<void> => {
  const _id = req.params.id;

  try {
    await User.findByIdAndRemove({ _id });
    res.status(200).json({message: "User Deleted Successfully"});
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<void>}
 */
const GetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

export default GetUsers;
