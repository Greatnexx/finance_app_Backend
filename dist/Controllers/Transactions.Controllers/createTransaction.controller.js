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
exports.createTransaction = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validationService_1 = __importDefault(require("../../services/validationService"));
const transactionModel_1 = __importDefault(require("../../models/transactionModel/transactionModel"));
const Error_1 = require("../../utils/Errors/Error");
exports.createTransaction = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const validation = yield validationService_1.default.validateObject({
        amount: "numeric|required",
        category: "string|required",
        narration: "string|required",
        budget_id: "string",
    }, Object.assign({}, req === null || req === void 0 ? void 0 : req.body));
    if (validation.error) {
        res.status(403).json(validation);
        return;
    }
    const { amount, category, narration, budget_id } = req.body;
    const user_id = (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a._id;
    if (!user_id) {
        throw new Error(Error_1.ErrorCode.UNAUTHORIZED);
    }
    const transaction = yield transactionModel_1.default.create({
        amount,
        category,
        narration,
        budget_id,
        user_id
    });
    res.status(201).json({
        success: true,
        data: transaction,
        message: "Transaction created successfully"
    });
}));
//# sourceMappingURL=createTransaction.controller.js.map