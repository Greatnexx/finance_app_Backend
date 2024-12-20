import asyncHandler from "express-async-handler";
import Transaction from "../../models/transactionModel/transactionModel";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";
import { ErrorCode } from "../../utils/Errors/Error";

export const getMonthlyBreakdown = asyncHandler(async (req: CustomRequest, res: Response) => {
    const user_id = req?.user?._id;

    if (!user_id) {
        res.status(401).json(ErrorCode.UNAUTHORIZED);
        return;
    }

    // Fetch transactions for the user
    const transactions = await Transaction.find({ user_id });

    // Initialize an object to hold monthly breakdown
    const monthlyBreakdown: { [key: string]: { income: number; expenses: number } } = {};

    transactions.forEach(transaction => {
        const date = new Date(transaction.createdAt);
        const monthYear = `${date.getFullYear()}-${date.getMonth() + 1}`; 

        // Initialize the monthYear entry if it doesn't exist
        if (!monthlyBreakdown[monthYear]) {
            monthlyBreakdown[monthYear] = { income: 0, expenses: 0 };
        }

        // Update income or expenses based on transaction type
        if (transaction.type === 'income') {
            monthlyBreakdown[monthYear].income += transaction.amount;
        } else if (transaction.type === 'expense') {
            monthlyBreakdown[monthYear].expenses += transaction.amount;
        }
    });

    // Convert the monthly breakdown object to an array
    const breakdownArray = Object.entries(monthlyBreakdown).map(([monthYear, amounts]) => ({
        monthYear,
        income: amounts.income,
        expenses: amounts.expenses,
    }));

    res.status(200).json({
        success: true,
        data: breakdownArray,
        message: "Monthly breakdown retrieved successfully"
    });
});