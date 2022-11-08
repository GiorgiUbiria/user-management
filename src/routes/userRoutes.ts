import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get("/users", UserController.GetUsers);

// UserRouter.post("/add-user", UserController.CreateUser);

export default UserRouter;
