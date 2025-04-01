
import asynchHandler from "express-async-handler";
import Budget from "../../models/budgetModel/budgetModel";
import { ErrorCode } from "../../utils/Errors/Error";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const createBudget = asynchHandler(async (req:CustomRequest, res:Response) => {
    
    const user_id = req?.user?._id!;
    const { title, total_amount, duration } = req.body;
  
    if (!user_id) {
      throw new Error(ErrorCode.UNAUTHORIZED);
    }
  
    const newBudget = await Budget.create({
      title,
      total_amount,
      duration,
      user_id
    });
  
    res.status(201).json({
      success: true,
      data: newBudget,
      message: 'Budget created successfully',
    });
  });
  