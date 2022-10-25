import express, {
  Request,
  Response,
  NextFunction,
  Application,
  ErrorRequestHandler,
} from "express"

const errorHandler: ErrorRequestHandler = async (
  error,
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  res.status(error.status || 500)
  res.send({
    status: error.status || 500,
    message: error.message,
  })
}

export = errorHandler
