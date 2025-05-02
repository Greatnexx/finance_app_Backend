import Transaction from "../../models/transactionModel";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const deleteTransaction = (async (req:CustomRequest, res:Response) => {
    const { id } = req.params;

    const user_id = req?.user?._id!;

    const transaction = await Transaction.findById(id);

    if (!transaction) {
        throw new Error(`Transaction not found for ID ${id}`);
    }

    
    if (transaction.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this transaction");
    }

    // soft delete the transaction
    const deletedTransaction = await Transaction.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );


    
    res.status(200).json({
        success: true,
        data: deletedTransaction,
        message: `Transaction for ${id} deleted successfully`,
    });
});
