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
exports.deleteTransaction = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const transactionModel_1 = __importDefault(require("../../models/transactionModel/transactionModel"));
exports.deleteTransaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { id } = req.params;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    const transaction = yield transactionModel_1.default.findById(id);
    if (!transaction) {
        throw new Error(`Transaction not found for ID ${id}`);
    }
    if (transaction.user_id.toString() !== user_id.toString()) {
        throw new Error("Unauthorized to delete this transaction");
    }
    const deletedTransaction = yield transactionModel_1.default.findByIdAndDelete(id);
    res.status(200).json({
        success: true,
        data: deletedTransaction,
        message: `Transaction for ${id} deleted successfully`,
    });
}));
//# sourceMappingURL=deleteTransaction.controller.js.map