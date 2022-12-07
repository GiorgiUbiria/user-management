import { Router } from "express";

import utils from "../utils/utils";

import GetUsers, {
  ViewUser,
  EditUsername,
  DeleteUser,
  ChangePassword,
} from "../controllers/user/user.controller";

const UserRouter: Router = Router();

/* Authentication Middleware */
UserRouter.use(utils.verifyJWT);

/* GET REQUESTS */
UserRouter.get("/users", GetUsers);

UserRouter.get("/users/:id", ViewUser);

/* PATCH REQUESTS */
UserRouter.patch("/edit__username/:id", EditUsername);

UserRouter.patch("/change__password/:id", ChangePassword);

/* DELETE REQUESTS */
UserRouter.delete("/deleteuser/:id", DeleteUser);

export default UserRouter;
