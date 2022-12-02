import { Request, Response } from "express";
import compression from "compression";

const compressApp = compression({
  level: 6,
  threshold: 100 * 1000,
  filter: (req: Request, res: Response) => {
    if (req.headers["x-no-compression"]) {
      return false;
    }
    return compression.filter(req, res);
  },
});

export default compressApp;