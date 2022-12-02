import { Router } from "express";

import utils from "../utils/utils";

import GetUsers, {
  EditUser,
  DeleteUser,
} from "../controllers/user/user.controller";

const UserRouter: Router = Router();

/* Authentication Middleware */
UserRouter.use(utils.verifyJWT);

/* GET REQUESTS */
UserRouter.get("/users", GetUsers);

/* POST REQUESTS */
UserRouter.patch("/edituser/:id", EditUser);

UserRouter.delete("/deleteuser/:id", DeleteUser);

export default UserRouter;
