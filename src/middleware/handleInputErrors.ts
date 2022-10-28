import { Request, Response, NextFunction } from "express";
import { validationResult } from "express-validator";
export const handleInputHandlers = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(401).send({ erros: errors.array() });
    return;
  }
  next();
};
