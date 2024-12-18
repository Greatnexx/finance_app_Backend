import asyncHandler from "express-async-handler";
import Budget from "../../models/budgetModel/budgetModel";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const getAllBudgets = asyncHandler(async (req:CustomRequest, res:Response) => {
  const { sort, page = 1, limit = 10 } = req.query as Record<string, string | number | boolean>;;

  // Default page and limit numbers
  const pageNumber =page ? Number(page) : 1;
  const limitNumber = limit ?Number (limit) : 10;
  const skip = (pageNumber - 1) * limitNumber;

  const user_id = req?.user?._id;

  const allowedFilters = ["title", "total_amount", "duration"];

  // Build filters for querying
  const filters:any = {  user_id }; 
  for (const filter of allowedFilters) {
    if (req.body && req.body[filter]) {
      filters[filter] = req.body[filter];
    }
  }

  // Define allowed sorting fields and process sort query
  const allowedSorts:any = ["id", "title", "total_amount", "duration"];
  const sortOptions :any= {};


  
  // Handle multi-field sorting
  if (sort) {
    const sortFields = Array.isArray(sort) ? sort : [sort];
    for (const field of sortFields) {
      const [sortField, sortOrder] = field.split(":");
      if (allowedSorts.includes(sortField)) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
    }
  }

  // Fetch budgets with pagination and sorting
  const budget = await Budget.find(filters)
    .sort(sortOptions)
    .skip(skip)
    .limit(limitNumber);

  const totalItems = await Budget.countDocuments(filters);

  const totalPages = Math.ceil(totalItems / limitNumber);

  res.status(200).json({
    success: true,
    error: false,
    data: budget,
    pagination: {
      totalItems,
      totalPages,
      currentPage: pageNumber,
    },
    message:"Budget retrived Sucessfully",
  });
});
