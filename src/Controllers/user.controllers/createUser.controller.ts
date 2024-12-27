import asynchHandler from "express-async-handler"
import validator from "../../services/validationService"
import User from "../../models/user.models/userModel"
import bcrypt from "bcryptjs"
import { ErrorCode } from "../../utils/Errors/Error"
import { Request, Response } from "express"

export const createUser  = asynchHandler(async(req:Request,res:Response)=>{
    const validation = await validator.validateObject({

        username: "required|string",
        email: "required|string",
        password: "required|string"
    },{...req?.body})
   
  
    if(validation.error){
         res.status(403).json(validation)
         return;
    }

    const {username,email,password} = req.body;

    const existingUser = await User.findOne({email: email})
    if(existingUser){
        res.status(409)
        throw new Error(ErrorCode.USER_ALREADY_EXISTS)
    }
 
   const hashPassword =await bcrypt.hash(password,10)

    const newUser = await User.create({
        username,
        email,
        password :hashPassword   
    })

    const savedUser = await newUser.save();

    if(!savedUser){
        throw new Error('Failed to save user')
    }

    res.status(201).json({
        success: true,
        data: {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
           
        },
        message: 'User created successfully',
        
    })


})