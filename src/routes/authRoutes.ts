import { Router } from "express";
import passport from "passport";

import AuthController from "../controllers/auth/auth.controller";

const AuthRouter: Router = Router();

AuthRouter.post("/sign-up", AuthController.signUp);

AuthRouter.post("/login", AuthController.signIn);

AuthRouter.get("/login", AuthController.getSignInPage);

AuthRouter.get("/sign-up", AuthController.getSignUpPage);

export default AuthRouter;
