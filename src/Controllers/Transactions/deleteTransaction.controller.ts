import asynchHandler from "express-async-handler"
import Transaction from "../../models/transactionModel/transactionModel";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const deleteTransaction = asynchHandler(async (req:CustomRequest, res:Response) => {
    const { id } = req.params;

    const user_id = req?.user?._id!;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
        throw new Error(`Transaction not found for ID ${id}`);
    }

    
    if (transaction.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this transaction");
    }

    const deletedTransaction = await Transaction.findByIdAndDelete(id);

    res.status(200).json({
        success: true,
        data: deletedTransaction,
        message: `Transaction for ${id} deleted successfully`,
    });
});
