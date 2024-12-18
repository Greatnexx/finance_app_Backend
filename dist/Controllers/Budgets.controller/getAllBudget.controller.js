"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllBudgets = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const budgetModel_1 = __importDefault(require("../../models/budgetModel/budgetModel"));
exports.getAllBudgets = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { sort, page = 1, limit = 10 } = req.query;
    ;
    // Default page and limit numbers
    const pageNumber = page ? Number(page) : 1;
    const limitNumber = limit ? Number(limit) : 10;
    const skip = (pageNumber - 1) * limitNumber;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const allowedFilters = ["title", "total_amount", "duration"];
    // Build filters for querying
    const filters = { user_id };
    for (const filter of allowedFilters) {
        if (req.body && req.body[filter]) {
            filters[filter] = req.body[filter];
        }
    }
    // Define allowed sorting fields and process sort query
    const allowedSorts = ["id", "title", "total_amount", "duration"];
    const sortOptions = {};
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
    const budget = yield budgetModel_1.default.find(filters)
        .sort(sortOptions)
        .skip(skip)
        .limit(limitNumber);
    const totalItems = yield budgetModel_1.default.countDocuments(filters);
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
        message: "Budget retrived Sucessfully",
    });
}));
//# sourceMappingURL=getAllBudget.controller.js.map