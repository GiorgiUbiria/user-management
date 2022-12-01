import { Router } from "express";

import AuthController from "../controllers/auth/auth.controller";

import utils from "../config/utils";

const AuthRouter: Router = Router();

AuthRouter.post("/register", AuthController.signUp);

AuthRouter.post("/login", AuthController.Login);

AuthRouter.post("/logout", AuthController.Logout);

AuthRouter.get("/refresh", utils.handleRefreshToken);

AuthRouter.post("/changerole", AuthController.changeRole);

export default AuthRouter;
