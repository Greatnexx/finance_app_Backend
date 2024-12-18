
import asynchHandler from "express-async-handler";
import validator from "../../services/validationService";
import Budget from "../../models/budgetModel/budgetModel";
import { ErrorCode } from "../../utils/Errors/Error";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const createBudget = asynchHandler(async (req:CustomRequest, res:Response) => {
    const validation = await validator.validateObject(
      {
        title: "string|required",
        total_amount: "numeric|required", 
        duration: "string"
      },
      { ...req?.body }
    );
  
    if (validation.error) {
       res.status(400).json(validation);
       return;
    }
  
  
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
  