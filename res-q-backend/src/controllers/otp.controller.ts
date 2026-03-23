import type { Request, Response } from "express";

import * as otpService from "../services/opt.service"

export const sendOTP = async (req:Request, res:Response)=>{
     try {
          const {phone} = req.body;

          const otp = await otpService.createOTP(phone);
          console.log("OTP ->", otp);

          res.json({
               success:true,
               message :"OTP sent successfully"
          })
     } catch (err:any) {
          res.status(500).json({
               error:err.message
          })
          
     }
}

export const verifyOTP = async (req:Request, res:Response)=>{
     try {
          const {phone,otp}= req.body;
          const result = await otpService.verifyOTP(phone,otp);

          if(!result.success){
               return res.status(400).json(result);
          }
          res.json({
               success : true,
               message : "Phone verified successfully"
          })
     } catch (err:any) {
          res.status(500).json({
               error: err.message,
          })
     }
}