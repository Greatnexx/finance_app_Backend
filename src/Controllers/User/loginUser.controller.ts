import asynchHandler from "express-async-handler";
import User from "../../models/userModel";
import bcrypt from "bcryptjs"
import { ErrorCode } from "../../utils/Errors/Error";
import generateToken from "../../utils/Token/generateToken";
import { CustomRequest } from "Interfaces/userInterface/user.interface";
import { Response } from "express";
import redis from "../../config/redis";

export const loginUser = (async(req:CustomRequest,res:Response)=>{


    const {email,password} = req.body;

    const user = await User.findOne({email:email})
    if(!user){
        throw new Error(ErrorCode.USER_NOT_FOUND)
    }
   

    const isMatch = await bcrypt.compare(password,user.password);

    if(!isMatch){
        throw new Error("Invalid Credentials")
    }

    const accessToken = generateToken(user?._id.toString())

    // Store the token in Redis (e.g., auth_token:{userId})
  const redisKey = `auth_token:${user._id}`;
  await redis.set(redisKey, accessToken, "EX", process.env.EXP_TIME || "3600"); // EX sets expiration time in seconds (1 hour)

    res.status(200).json({
        success: true,
        data: {
            _id: user._id,
            name: user.username,
            email: user.email,
            token: accessToken,
        },
        message:"Login Successful"

    })
})