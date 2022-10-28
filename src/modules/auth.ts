import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";
interface User {
  id: string;
  username: string;
}
export const createJWT = (user: User) => {
  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET as string
  );
  return token;
};

export const protect = (req: Request, res: Response, next: NextFunction) => {
  const bearer = req.headers.authorization;
  if (!bearer) {
    res.status(401).send({ message: "authentication required" });
    return;
  }
  // bearer 190rajfpas
  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401).send({ message: "authentication required" });
    return;
  }

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET as string) as User;
    (req as any).user = user;
    next();
  } catch (e) {
    res.status(401).send({ message: "invalid token" });
    2;
  }
};

export const comparePasswords = (
  reqPassword: string,
  hashedPassword: string
) => {
  return bcrypt.compare(reqPassword, hashedPassword);
};

export const hashPassword = (reqPassword: string) => {
  return bcrypt.hash(reqPassword, 5);
};
