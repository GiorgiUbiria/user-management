import { Request, Response, NextFunction, Router } from "express";
/* import { getUsers, addUser } from "../controllers/userController"; */
import  UserController  from "../controllers/userController";

const UsersRouter: Router = Router();

/* UsersRouter.get("/", getUsers);

UsersRouter.post("/add-user", addUser); */

UsersRouter.post("/add-user", async (req: Request, res: Response) => {
    const user = await UserController.CreateUser({
      email: req.body.firstName,
      username: req.body.lastName,
      password: req.body.email,
      role: req.body.role,
    });

    // tslint:disable-next-line:no-console
    console.log(user);
});

export { UsersRouter };
