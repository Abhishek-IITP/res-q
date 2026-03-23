import type { Request, Response } from "express";
import * as  userService from "../services/user.service"
import prisma from "../config/db";

export const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userService.createUser(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getUserById= async(req:Request, res:Response)=>{
    try {
      const {id} = req.params as { id: string };

     const user = await prisma.user.findUnique({
          where : { id },
          include:{
               emergencyContacts: true,
          }
     })

     if(!user){
          return res.status(404).json({
               message: "User not Found"
          })
     }

     res.json({
          success: true,
          user,
     })
    } catch (err:any) {
     res.status(500).json({
          error : err.message
     })
    }
}