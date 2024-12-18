import express from 'express';
import { createTransaction } from  '../../Controllers/Transactions.Controllers/createTransaction.controller';
import { protect } from '../../middlewares/authMiddleWare';
import { getAllTransactions } from '../../Controllers/Transactions.Controllers/getAllTransactions.controller';
import { getSingleTransaction } from '../../Controllers/Transactions.Controllers/getSingleTransaction.controller';
import { deleteTransaction } from '../../Controllers/Transactions.Controllers/deleteTransaction.controller';
import { updateTransaction } from '../../Controllers/Transactions.Controllers/updateTransaction.controller';
const router = express.Router();


router.post("/",protect,createTransaction)
router.get("/",protect,getAllTransactions)
router.get("/:id",protect,getSingleTransaction)
router.delete("/:id",protect,deleteTransaction)
router.put("/:id",protect,updateTransaction)


export default router