import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import dotenv from "dotenv";
import { sendVerificationMail } from '../utils/verify-email';
import { sendForgetPasswordMail } from '../utils/reset-password-email';
import { generateAccessToken } from '../utils/generate-token';
import  { Request, Response } from "express";


dotenv.config();
const prisma = new PrismaClient()

interface userType {
   id: string,
   email: string,
   password: string,
}


export const isUserExist: userType | any = async (email: string) => {

   try {
      const user: userType | null = await prisma.user.findUnique({
         where: {
            email: email,
         },
      })

      if (typeof user === null) {
         return false
      } else {
         return user
      }
   } catch (error) {
      console.log(error);
   }

}

export const postUser: any = async (req: Request, res: Response) => {

   try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      bcrypt.hash(password, 10, async function (err: any, hash: string) {
         const user: userType = await prisma.user.create({
            data: {
               email: email,
               password: hash,
            }
         })
         sendVerificationMail(user);
         res.status(200).json(user);
      })
   } catch (error) {
      console.log(error)
   }
}

export const verifyUser: any = async (req: Request, res: Response) => {
   try {
      const userId: string = req.params.userId;

      await prisma.user.update({
         where: {
            id: userId,
         },
         data: {
            isVerified: true
         }
      });

      res.status(200).json({ status: true });
   } catch (error) {
      console.log(error)
   }
}

export const loginUser: any = async (req: Request, res: Response) => {

   try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      const checkUser: userType | any = await isUserExist(email);

      if (checkUser as userType) {
         bcrypt.compare(password, checkUser.password, function (err: any, result: boolean) {
            if (result === true) {
               res.status(200).json({ status: true, token: generateAccessToken(checkUser.id) })
            } else {
               res.status(500).json({ status: false })
            }
         })
      } else {
         console.log("Something gone wrong!!!")
      }
   } catch (error) {
      console.log(error)
   }

}

export const forgetPassword: any = async (req: Request, res: Response) => {
   try {
      const email: string = req.body.email;

      const checkUser: userType | any = await isUserExist(email);
      if (checkUser as userType) {
         sendForgetPasswordMail(checkUser);
         res.status(200).json({ status: true })
      }
   } catch (error) {
      console.log(error);
   }
}

export const resetPassword: any = async (req: Request, res: Response) => {
   try {
      const email: string = req.body.email;
      const password: string = req.body.password;

      bcrypt.hash(password, 10, async function (err: any, hash: string) {
         await prisma.user.update({
            where: {
               email: email,
            },
            data: {
               password: hash,
            }
         });
         res.status(200).json({ status: true });
      })
   } catch (error) {
      console.log(error)
   }

}


export const changePassword: any = async (req: Request, res: Response) => {

   try {
      const oldPassword: string = req.body.oldPassword;
      const newPassword: string = req.body.newPassword;

      bcrypt.compare(oldPassword, (req as any).user.password, async function (err: any, result: boolean) {
         if (result === true) {
            bcrypt.hash(newPassword, 10, async function (err: any, hash: string) {
               await prisma.user.update({
                  where: {
                     email: (req as any).user.email,
                  },
                  data: {
                     password: hash,
                  }
               });
               res.status(200).json({ status: true });
            })
         } else {
            res.status(500).json({ status: false })
         }
      })
   } catch (error) {
      console.log(error);
   }

}

