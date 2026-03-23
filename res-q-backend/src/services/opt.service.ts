import prisma from "../config/db";

export const generateOTP =(): string =>{
     return Math.floor(100000 + Math.random() * 900000).toString();
}

export const createOTP = async(phone:string)=>{
     const otp = generateOTP();

     const expiresAt = new Date(Date.now() + 5*60*1000);
     
     await prisma.oTP.create({
          data:{
               phone,
               otp,
               expiresAt
          }
     }) 
     return otp;
}

export const verifyOTP = async(phone:string, otp:string)=>{
     const record = await prisma.oTP.findFirst({
          where:{
               phone,
               otp,
               verified:false,
          },
          orderBy:{
               createdAt: "desc",
          }
     })

     if(!record) return {success: false, message : "Invalid OTP"};

     if(record.expiresAt< new Date()){
          return{success:false, message : "OTP expired"};
     }

     await prisma.oTP.update({
          where:{id: record.id},
          data :{verified: true}
     })

     await prisma.user.updateMany({
          where:{phone},
          data:{isVerified:true},
     })
     return {success: true};
}


