import { Router } from "express";
import passport from "passport";

import UserController from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.get("/add-user", UserController.GetCreateUserPage);

UserRouter.get(
  "/users",
  passport.authenticate("jwt", { session: false }),
  (req, res, next) => {
    res.send("shexvedi");
  }
);

export default UserRouter;
