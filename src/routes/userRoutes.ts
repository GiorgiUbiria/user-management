import { Router } from "express";
import passport from "passport";

import utils from "../config/utils";

import UserController from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.get("/", utils.verifyJWT, (req, res) => {
  res.render("index", { layout: false, pageTitle: "Main Page" });
});

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get(
  "/users",
  // passport.authenticate("jwt", { session: false }),
  utils.verifyJWT,
  UserController.GetUsers
);

export default UserRouter;
