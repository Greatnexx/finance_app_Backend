"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const transactionSchema = new mongoose_1.default.Schema({
    amount: {
        type: Number,
        required: true,
        min: 0,
    },
    category: {
        type: String,
        enum: ["income", "expense"],
        required: true,
    },
    narration: {
        type: String,
        required: true,
        maxlength: 500,
    },
    budget_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "Budget",
        default: null,
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const Transaction = mongoose_1.default.model("Transaction", transactionSchema);
exports.default = Transaction;
//# sourceMappingURL=transactionModel.js.map