"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createTransaction_controller_1 = require("../../Controllers/Transactions.Controllers/createTransaction.controller");
const authMiddleWare_1 = require("../../middlewares/authMiddleWare");
const getAllTransactions_controller_1 = require("../../Controllers/Transactions.Controllers/getAllTransactions.controller");
const getSingleTransaction_controller_1 = require("../../Controllers/Transactions.Controllers/getSingleTransaction.controller");
const deleteTransaction_controller_1 = require("../../Controllers/Transactions.Controllers/deleteTransaction.controller");
const updateTransaction_controller_1 = require("../../Controllers/Transactions.Controllers/updateTransaction.controller");
const router = express_1.default.Router();
router.post("/", authMiddleWare_1.protect, createTransaction_controller_1.createTransaction);
router.get("/", authMiddleWare_1.protect, getAllTransactions_controller_1.getAllTransactions);
router.get("/:id", authMiddleWare_1.protect, getSingleTransaction_controller_1.getSingleTransaction);
router.delete("/:id", authMiddleWare_1.protect, deleteTransaction_controller_1.deleteTransaction);
router.put("/:id", authMiddleWare_1.protect, updateTransaction_controller_1.updateTransaction);
exports.default = router;
//# sourceMappingURL=transactionRoute.js.map