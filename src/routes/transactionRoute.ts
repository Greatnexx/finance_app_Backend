import express from 'express';
import { createTransaction } from  '../../Controllers/Transactions.controllers/createTransaction.controller';
import { protect } from '../middlewares/authMiddleWare';
import { getAllTransactions } from '../../Controllers/Transactions.controllers/getAllTransactions.controller';
import { getSingleTransaction } from '../../Controllers/Transactions.controllers/getSingleTransaction.controller';
import { deleteTransaction } from '../../Controllers/Transactions.controllers/deleteTransaction.controller';
import { updateTransaction } from '../../Controllers/Transactions.controllers/updateTransaction.controller';
import { validateTransaction } from '../services/validation';
const router = express.Router();


router.post("/",protect,validateTransaction,createTransaction)
router.get("/",protect,getAllTransactions)
router.get("/:id",protect,getSingleTransaction)
router.delete("/:id",protect,deleteTransaction)
router.put("/:id",protect,updateTransaction)


export default router