import prisma from "../db";
import { hashPassword, comparePasswords, createJWT } from "../modules/auth";
import { Request, Response } from "express";

export const signup = async (req: Request, res: Response, next) => {
  const { username, password } = req.body;
  const hashedPassword = await hashPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });
    const token = createJWT(user);
    res.status(200).send({ token });
  } catch (e) {
    next({ type: "input" });
  }
};

export const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    res.status(400).send({ message: "no user found with this usernam" });
    return;
  }

  const match = await comparePasswords(password, user.password);
  if (!match) {
    res.status(401).send({ message: "username and password don't match" });
  }
  const token = createJWT(user);
  res.status(200).send({ token });
};
