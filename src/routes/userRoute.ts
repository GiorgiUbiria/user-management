import { Request, Response, NextFunction, Router } from "express";
import { getUsers, addUser } from "../controllers/userController";

const UsersRouter: Router = Router();

UsersRouter.get("/", getUsers);

UsersRouter.post("/add-user", addUser);

export { UsersRouter };
