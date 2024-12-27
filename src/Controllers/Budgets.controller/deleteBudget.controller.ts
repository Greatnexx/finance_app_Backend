import { Response } from "express";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import Budget from "../../models/budgetModel/budgetModel";
import asynchHandler from "express-async-handler"

export const deleteBudget = asynchHandler(async (req:CustomRequest, res:Response) => {
    const { id } = req.params;

    const user_id = req?.user?._id!;

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
