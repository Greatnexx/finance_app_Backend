import asynchHandler from "express-async-handler";
import User from "../../models/user.models/userModel";
import bcrypt from "bcryptjs"
import { ErrorCode } from "../../utils/Errors/Error";
import generateToken from "../../utils/Token/generateToken";
import { CustomRequest } from "Interfaces/userInterface/user.interface";
import { Response } from "express";

export const loginUser = asynchHandler(async(req:CustomRequest,res:Response)=>{


    const {email,password} = req.body;

    const user = await User.findOne({email:email})
    if(!user){
        throw new Error(ErrorCode.USER_NOT_FOUND)
    }
   

    const isMatch = await bcrypt.compareSync(password,user.password);

    if(!isMatch){
        throw new Error("Invalid Credentials")
    }

    const accessToken = generateToken(user?._id.toString())
    res.status(200).json({
        success: true,
        data: {
            _id: user._id,
            name: user.username,
            email: user.email,
            token: accessToken,
        },
        message:"Login Succefull"

    })
})