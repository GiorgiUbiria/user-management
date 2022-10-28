import { Request, Response, NextFunction, Router } from "express";

export = async (req: Request, res: Response): Promise<void> => {
  res.render("index", { layout: false, pageTitle: "Home" });
};
