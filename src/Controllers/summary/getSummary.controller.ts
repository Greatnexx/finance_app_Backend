import asyncHandler from "express-async-handler";
import Transaction from "../../models/transactionModel/transactionModel";
import Budget from "../../models/budgetModel/budgetModel"; 
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";
import { ErrorCode } from "../../utils/Errors/Error";

export const getTransactionSummary = asyncHandler(async (req: CustomRequest, res: Response) => {
    const user_id = req?.user?._id;

    if (!user_id) {
        res.status(401).json(ErrorCode.UNAUTHORIZED);
        return;
    }

   
    const transactions = await Transaction.find({ user_id });

   
    let totalIncome = 0;
    let totalIncomeAmount = 0;
    let totalExpenses = 0;
    let totalExpensesAmount = 0;

    // Initialize an object to hold category spending
    const categorySpending: { [key: string]: number } = {};

    // Calculate totals and category spending
    transactions.forEach(transaction => {
        if (transaction.type === 'income') {
            totalIncome++;
            totalIncomeAmount += transaction.amount;
        } else if (transaction.type === 'expense') {
            totalExpenses++;
            totalExpensesAmount += transaction.amount;

            // Aggregate spending by category
            if (categorySpending[transaction.category]) {
                categorySpending[transaction.category] += transaction.amount;
            } else {
                categorySpending[transaction.category] = transaction.amount;
            }
        }
    });

    // Convert category spending object to an array and sort it
    const sortedCategories = Object.entries(categorySpending)
        .map(([category, amount]) => ({ category, amount }))
        .sort((a, b) => b.amount - a.amount); 

    // Get top spending categories (e.g., top 3)
    const topSpendingCategories = sortedCategories.slice(0, 3);

    // Retrieve all budgets for the user
    const budgets = await Budget.find({ user_id });

    // Calculate remaining budget across all budgets
    let totalBudgetAmount = 0;
    let totalSpentAmount = totalExpensesAmount; 

    budgets.forEach(budget => {
        totalBudgetAmount += budget.total_amount; 
    });

    // Calculate remaining budget
    const remainingBudget = totalBudgetAmount - totalSpentAmount;

    const insight = {
        totalIncome,
        totalIncomeAmount,
        totalExpenses,
        totalExpensesAmount,
        topSpendingCategories,
        remainingBudget, 
    };

    res.status(200).json({
        success: true,
        data: insight,
        message: "Transaction summary retrieved successfully"
    });
});