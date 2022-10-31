import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controllers/api/userController";
import mainController from "../controllers/api/mainController";

const UserRouter: Router = Router();

UserRouter.get("/", mainController);

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get("/login", UserController.GetLoginPage);

UserRouter.get("/users", UserController.GetUsers);

UserRouter.post("/add-user", UserController.CreateUser);

export default UserRouter;
