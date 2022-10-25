import { Request, Response, NextFunction, Router } from "express"

const mainRoute = Router()

mainRoute.get("/", async (req: Request, res: Response): Promise<void> => {
  res.render("index", { layout: false })
})

export = mainRoute
