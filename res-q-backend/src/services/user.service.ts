import prisma from "../config/db";
import { generateQRCode } from "./qr.service";

interface CreateUserInput {
  fullName: string;
  phone: string;
}

export const createUser = async(data: CreateUserInput)=>{
     const user = await prisma.user.create({
          data:{
               fullName: data.fullName,
               phone : data.phone
          }
     });

     const qrCode = await generateQRCode(user.id);

     const updatedUser= await prisma.user.update({
          where:{id: user.id},
          data:{
               qrCodeUrl: qrCode,
          }
     })
     return{
          ...updatedUser,
          qrCode,
     }
}