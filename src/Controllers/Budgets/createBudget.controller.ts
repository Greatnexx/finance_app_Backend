
import asynchHandler from "express-async-handler";
import Budget from "../../models/budgetModel/budgetModel";
import { ErrorCode } from "../../utils/Errors/Error";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const createBudget = asynchHandler(async (req:CustomRequest, res:Response) => {
    
  const { title, total_amount, duration } = req.body;
  const user = req.user; 
  
    if (!user?._id) {
      throw new Error(ErrorCode.UNAUTHORIZED);
    }
    const user_id= user._id
  
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
  