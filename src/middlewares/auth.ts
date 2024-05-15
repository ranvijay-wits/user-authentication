import jwt from 'jsonwebtoken';
import dotenv from "dotenv";
dotenv.config();
import { PrismaClient } from '@prisma/client'
import { NextFunction } from 'express';
import  { Request, Response } from "express";
const prisma = new PrismaClient()

const authenticate: any = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token: string | undefined = req.header('Authorization');
    const secretKey: string | undefined = process.env.SECRET_KEY;

    const verifiedUser: any = jwt.verify(token as string, secretKey as string);

    const user = await prisma.user.findUnique({
      where: {
        id: (verifiedUser.userId),
      },
    });
    (req as any).user = user;
    console.log((req as any).user);
    next();

  } catch (error) {
    console.log(error);
  }
}

export { authenticate };