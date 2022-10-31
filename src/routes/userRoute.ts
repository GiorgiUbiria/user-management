import { Request, Response, NextFunction, Router } from "express";
import UserController from "../controllers/api/userController";

const UserRouter: Router = Router();

UserRouter.get("/users", UserController.GetUsers);

UserRouter.post("/add-user", UserController.CreateUser);

export { UserRouter };
