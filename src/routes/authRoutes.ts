/* import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";

import AuthController from "../controllers/auth/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post("/sign-up", AuthController.SignUpUser);

AuthRouter.post(
  "/login",
  passport.authenticate("local", {
    failureRedirect: "/login",
    failureMessage: true,
  }),
  AuthController.PostLogin
);

AuthRouter.get("/login", AuthController.GetLoginPage);

AuthRouter.get("/sign-up", AuthController.GetSignUpPage);

export default AuthRouter;
 */