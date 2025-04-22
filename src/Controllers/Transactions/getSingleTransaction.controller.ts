import asynchHandler from "express-async-handler";
import Transaction from "../../models/transactionModel/transactionModel";

export const getSingleTransaction = asynchHandler(async(req,res)=>{
    const {id}=req.params

    const transaction = await Transaction.findById(id)

    if(!transaction){
        throw new Error("transaction not found")
    }

    res.status(200).json({
        success: true,
        data: transaction,
        message:`Budget retrieved for ${id} successfully`
    })


})