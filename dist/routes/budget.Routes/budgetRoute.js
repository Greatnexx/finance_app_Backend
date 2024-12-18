"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createBudget_controller_1 = require("../../Controllers/Budgets.controller/createBudget.controller");
const authMiddleWare_1 = require("../../middlewares/authMiddleWare");
const deleteBudget_controller_1 = require("../../Controllers/Budgets.controller/deleteBudget.controller");
const getAllBudget_controller_1 = require("../../Controllers/Budgets.controller/getAllBudget.controller");
const getSingleBudget_controller_1 = require("../../Controllers/Budgets.controller/getSingleBudget.controller");
const updateBudget_controller_1 = require("../../Controllers/Budgets.controller/updateBudget.controller");
const router = express_1.default.Router();
router.post('/', authMiddleWare_1.protect, createBudget_controller_1.createBudget);
router.delete('/:id', authMiddleWare_1.protect, deleteBudget_controller_1.deleteBudget);
router.get('/', authMiddleWare_1.protect, getAllBudget_controller_1.getAllBudgets);
router.get('/:id', authMiddleWare_1.protect, getSingleBudget_controller_1.getSingleBudget);
router.put('/:id', authMiddleWare_1.protect, updateBudget_controller_1.updateBudget);
exports.default = router;
//# sourceMappingURL=budgetRoute.js.map