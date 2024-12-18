import { Response } from "express";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import Budget from "../../models/budgetModel/budgetModel";
import asyncHandler from "express-async-handler";

export const updateBudget = asyncHandler(async (req:CustomRequest, res:Response) => {
  const { id } = req.params;
  const user_id = req?.user?._id!;

  const allowedUpdates = ["title", "total_amount", "duration"];

  // Verify the body is not empty
  if (!Object.keys(req?.body).length) {
    res.status(400);
    throw new Error("Request body is empty");
  }

  // Prevent invalid fields
  const data :any= {};
  for (const key of allowedUpdates) {
    if (req?.body?.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  // Check if no valid fields are present in the data object
  if (!Object.keys(data).length) {
    res.status(400);
    throw new Error("No valid fields provided for update");
  }

  // Find the budget
  const budget = await Budget.findById(id);

  if (!budget) {
    res.status(404);
    throw new Error("Budget not found");
  }

  // Ensure the logged-in user owns the budget
  if (budget.user_id.toString() !== user_id.toString()) {
    res.status(403);
    throw new Error("Unauthorized to update this budget");
  }

  // Update the budget
  const updatedBudget = await Budget.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, // Enforce schema validation
  });

  res.status(200).json({
    success: true,
    data: updatedBudget,
    message: `Budget for ${id} updated successfully`,
  });
});
