import asynchHandler from "express-async-handler";
import Budget from "../../models/budgetModel/budgetModel";

export const getSingleBudget = asynchHandler(async(req,res)=>{
    const {id}=req.params

    const budget = await Budget.findById(id)

    if(!budget){
        throw new Error("Budget not found")
    }

    res.status(200).json({
        success: true,
        data: budget,
        message:`Budget retrieved ${id} successfully`
    })


})