import { Response } from "express";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import Budget from "../../models/budgetModel/budgetModel";
import asynchHandler from "express-async-handler"
import { ErrorCode } from "Utils/Errors/Error";

export const deleteBudget = asynchHandler(async (req:CustomRequest, res:Response) => {
    const { id } = req.params;

const user= req.user
if(!user?._id){
    throw new Error(ErrorCode.UNAUTHORIZED)
} 
const user_id = user._id

    const budget = await Budget.findById(id);

    if (!budget) {
        throw new Error(`Budget not found for ID ${id}`);
    }

    
    
    if (budget.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this budget");
    }

    const deletedBudget = await Budget.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        data: deletedBudget,
        message: "Budget deleted successfully",
    });
});
