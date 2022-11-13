import { Router } from "express";
import passport from "passport";

import UserController from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get(
  "/users",
  passport.authenticate("jwt", {
    session: false,
  }),
  UserController.GetUsers
);

export default UserRouter;
