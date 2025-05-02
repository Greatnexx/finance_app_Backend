import { Response } from "express";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import Budget from "../../models/budgetModel";
import { ErrorCode } from "Utils/Errors/Error";

export const deleteBudget = (async (req:CustomRequest, res:Response) => {
    const { id } = req.params;

const user_id= req.user?._id
if(!user_id){
    throw new Error(ErrorCode.UNAUTHORIZED)
} 


    const budget = await Budget.findById(id);

    if (!budget) {
        throw new Error(`Budget not found for ID ${id}`);
    }

    if (budget.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this budget");
    }
    
    // soft delete the budget
    const deletedBudget = await Budget.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    res.status(200).json({
        success: true,
        data: deletedBudget,
        message: "Budget deleted successfully",
    });
});
