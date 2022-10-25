import express, { Request, Response, NextFunction, Application } from "express"
import path from "path"
import createHttpError from "http-errors"
import morgan from "morgan"
import expressLayouts from "express-ejs-layouts"
import { config } from "dotenv"

import errorHandler from "./middlewares/errorHandler"
import mainRoute from "./routes/mainRoute"

config()

const app: Application = express()

app.use(morgan("dev"))

app.use(express.json())

app.use(express.urlencoded({ extended: true }))

app.use(express.static(path.join(__dirname + "/public")))

app.use(expressLayouts)

app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

app.use(mainRoute)

app.use(
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    next(new createHttpError.NotFound())
  }
)

app.use(errorHandler)

export = app
