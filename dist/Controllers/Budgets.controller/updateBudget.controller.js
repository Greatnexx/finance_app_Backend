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
exports.updateBudget = void 0;
const budgetModel_1 = __importDefault(require("../../models/budgetModel/budgetModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.updateBudget = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const { id } = req.params;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const allowedUpdates = ["title", "total_amount", "duration"];
    // Verify the body is not empty
    if (!Object.keys(req === null || req === void 0 ? void 0 : req.body).length) {
        res.status(400);
        throw new Error("Request body is empty");
    }
    // Prevent invalid fields
    const data = {};
    for (const key of allowedUpdates) {
        if ((_b = req === null || req === void 0 ? void 0 : req.body) === null || _b === void 0 ? void 0 : _b.hasOwnProperty(key)) {
            data[key] = req.body[key];
        }
    }
    // Check if no valid fields are present in the data object
    if (!Object.keys(data).length) {
        res.status(400);
        throw new Error("No valid fields provided for update");
    }
    // Find the budget
    const budget = yield budgetModel_1.default.findById(id);
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
    const updatedBudget = yield budgetModel_1.default.findByIdAndUpdate(id, data, {
        new: true, // Return the updated document
        runValidators: true, // Enforce schema validation
    });
    res.status(200).json({
        success: true,
        data: updatedBudget,
        message: `Budget for ${id} updated successfully`,
    });
}));
//# sourceMappingURL=updateBudget.controller.js.map