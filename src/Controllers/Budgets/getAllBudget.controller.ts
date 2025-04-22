import asyncHandler from "express-async-handler";
import Budget from "../../models/budgetModel/budgetModel";
import { CustomRequest } from "../../interfaces/userInterface/user.interface";
import { Response } from "express";

export const getAllBudgets = asyncHandler(async (req: CustomRequest, res: Response) => {
  const { sort, page = 1, limit = 10 } = req.query as Record<string, string | number | boolean>;

  const pageNumber = Number(page);
  const limitNumber = Number(limit);
  const skip = (pageNumber - 1) * limitNumber;

const user = req.user
const user_id = user?._id
  const allowedFilters = ["title", "total_amount", "duration"];
  const filters: Record<string, string | number | unknown> = { user_id };

  for (const filter of allowedFilters) {
    if (req.body && req.body[filter]) {
      filters[filter] = req.body[filter];
    }
  }

  const allowedSorts = ["id", "title", "total_amount", "duration"] as const;
  const sortOptions: Record<string, 1 | -1> = {};

  if (sort) {
    const sortFields = Array.isArray(sort) ? sort : [sort];
    for (const field of sortFields) {
      const [sortField, sortOrder] = field.split(":");
      if (allowedSorts.includes(sortField as any)) {
        sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
      }
    }
  }

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
    message: "Budget retrieved successfully",
  });
});
