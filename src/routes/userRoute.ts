import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";
import UserController from "../controllers/api/userController";

const UserRouter: Router = Router();

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get("/login", UserController.GetLoginPage);

UserRouter.get("/sign-up", UserController.GetSignUpPage);

UserRouter.get("/users", UserController.GetUsers);

/* UserRouter.post("/add-user", UserController.CreateUser); */

UserRouter.post("/sign-up", UserController.SignUpUser);

UserRouter.post("/login", UserController.PostLogin);

export default UserRouter;
