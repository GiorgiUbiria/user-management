import { Request, Response } from "express";
import bcrypt from "bcrypt";

import User from "../../models/user.model";
import IUser from "../../types/user.interface.types";

/**
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<void>}
 */
export const ViewUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const _id = req.params.id;

    const user: IUser = (await User.findById(_id)) as IUser;

    res.status(200).json(user);
  } catch (error) {
    // tslint:disable-next-line:no-console
    console.error(error);
  }
};

/*
 *
 *
 * @param {Request} req
 * @param {Response} res
 * @return {*}  {Promise<void>}
 */
export const EditUsername = async (
  req: Request,
  res: Response
): Promise<void> => {
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
    res.status(200).json({ message: "User Deleted Successfully", id: _id });
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
export const ChangePassword = async (
  req: Request,
  res: Response
): Promise<void> => {
  const _id = req.params.id;
  const password = req.body.password;

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  try {
    const user: IUser = (await User.findOneAndUpdate(
      { _id },
      { password: hash },
      { new: true }
    )) as IUser;
    res
      .status(200)
      .json({ message: "password was updated successfully", user });
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
