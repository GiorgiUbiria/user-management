import { Router } from "express";

import AuthController from "../controllers/auth/auth.controller";

import utils from "../utils/utils";

import rateLimiter from "../middlewares/rateLimit";

const AuthRouter: Router = Router();

AuthRouter.use(rateLimiter);

AuthRouter.post("/register", AuthController.signUp);

AuthRouter.post("/login", AuthController.Login);

AuthRouter.post("/logout", AuthController.Logout);

AuthRouter.get("/refresh", utils.handleRefreshToken);

export default AuthRouter;
