import asyncHandler from "express-async-handler";
import Transaction from "../../models/transactionModel/transactionModel";
import { CustomRequest } from "Interfaces/userInterface/user.interface";
import { Response } from "express";

export const updateTransaction = asyncHandler(async (req:CustomRequest, res:Response) => {
  const { id } = req.params;
  const user_id = req?.user?._id!;

  const allowedUpdates = ["amount", "category", "narration"];

  // Verify the body is not empty
  if (!Object.keys(req?.body).length) {
    res.status(400);
    throw new Error("Request body is empty");
  }

  // Prevent invalid fields
  const data = {};
  for (const key of allowedUpdates) {
    if (req?.body?.hasOwnProperty(key)) {
      data[key] = req.body[key];
    }
  }

  if (!Object.keys(data).length) {
    res.status(400);
    throw new Error("No valid fields provided for update");
  }

  // Find the transaction
  const transaction = await Transaction.findById(id);

  if (!transaction) {
    res.status(404);
    throw new Error("Transaction not found");
  }
 
  
  if (transaction.user_id.toString() !== user_id.toString()) {
    res.status(403);
    throw new Error("Unauthorized to update this Transaction");
  }

  const updatedTransaction = await Transaction.findByIdAndUpdate(id, data, {
    new: true, // Return the updated document
    runValidators: true, 
  });

  res.status(200).json({
    success: true,
    data: updatedTransaction,
    message: `Transaction for ${id} updated successfully`,
  });
});
