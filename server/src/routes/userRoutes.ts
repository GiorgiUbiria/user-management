import { Router } from "express";

import utils from "../config/utils";

import GetUsers, { EditUser, DeleteUser } from "../controllers/api/user.controller";


const UserRouter: Router = Router();


/* Authentication Middleware */
UserRouter.use(utils.verifyJWT);


/* GET REQUESTS */
UserRouter.get("/users", GetUsers);


/* POST REQUESTS */
UserRouter.patch("/edituser/:id", EditUser);

UserRouter.delete("/deleteuser/:id", DeleteUser);


export default UserRouter;
