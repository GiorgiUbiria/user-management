import { Router } from "express";

import utils from "../config/utils";

import GetUsers from "../controllers/api/user.controller";

const UserRouter: Router = Router();

UserRouter.use(utils.verifyJWT);

UserRouter.get("/users", GetUsers);

export default UserRouter;
