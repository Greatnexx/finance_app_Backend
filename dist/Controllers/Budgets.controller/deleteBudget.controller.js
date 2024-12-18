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
exports.deleteBudget = void 0;
const budgetModel_1 = __importDefault(require("../../models/budgetModel/budgetModel"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
exports.deleteBudget = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const budget = yield budgetModel_1.default.findById(id);
    if (!budget) {
        throw new Error(`Budget not found for ID ${id}`);
    }
    // Here, budget.user is likely a MongoDB ObjectId, while user_id (from req.user.id) might be a plain string
    if (budget.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this budget");
    }
    const deletedBudget = yield budgetModel_1.default.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        data: deletedBudget,
        message: "Budget deleted successfully",
    });
}));
//# sourceMappingURL=deleteBudget.controller.js.map