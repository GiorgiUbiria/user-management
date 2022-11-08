import { Request, Response, NextFunction, Router } from "express";
import passport from "passport";

import AuthController from "../controllers/auth/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post("/sign-up", AuthController.SignUpUser);

/* AuthRouter.post(
  "/login",
  passport.authenticate("local", (err, user, info) => {
    // tslint:disable-next-line:no-console
    console.log("authenticate");
    // tslint:disable-next-line:no-console
    console.log(err);
    // tslint:disable-next-line:no-console
    console.log(user);
    // tslint:disable-next-line:no-console
    console.log(info);
  })
); */

AuthRouter.get("/login", AuthController.GetLoginPage);

AuthRouter.get("/sign-up", AuthController.GetSignUpPage);

export default AuthRouter;
