import Transaction from "../../models/transactionModel";
import { ErrorCode } from "../../utils/Errors/Error";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const createTransaction = (async(req:CustomRequest,res:Response)=>{


    const {amount, category, narration, budget_id,type} = req.body;
    const user_id = req?.user?._id;

    if(!user_id){
        throw new Error(ErrorCode.UNAUTHORIZED)
    }

    const transaction  = await Transaction.create({
        amount,
        category,
        narration,
        budget_id,
         type,
         user_id
    })


    res.status(201).json({
        success: true,
        data: transaction,
        message: "Transaction created successfully"

    })
})