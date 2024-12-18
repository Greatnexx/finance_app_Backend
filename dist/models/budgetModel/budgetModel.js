"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const budgetSchema = new mongoose_1.default.Schema({
    title: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
        enum: ['weekly', 'monthly', 'yearly'],
        default: "weekly",
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true });
budgetSchema.virtual("transactions", {
    ref: "Transaction",
    localField: "_id",
    foreignField: "budget_id",
});
const Budget = mongoose_1.default.model('Budget', budgetSchema);
exports.default = Budget;
//# sourceMappingURL=budgetModel.js.map