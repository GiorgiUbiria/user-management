import { Router } from "express";
import passport from "passport";

import utils from "../config/utils";

import UserController from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.get("/", UserController.GetIndexPage);

UserRouter.get("/add-user", utils.verifyJWT, UserController.GetCreateUserPage);

UserRouter.get(
  "/users",
  // passport.authenticate("jwt", { session: false }),
  utils.verifyJWT,
  UserController.GetUsers
);

export default UserRouter;
