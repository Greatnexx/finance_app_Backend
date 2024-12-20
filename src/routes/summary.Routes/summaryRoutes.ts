import { protect } from '../../middlewares/authMiddleWare';
import { getTransactionSummary } from '../../Controllers/summary/getSummary.controller';
import express from 'express'
import { getMonthlyBreakdown } from '../../Controllers/summary/getMonthlySummary.controller';
const router = express.Router();

router.get('/summary',protect,getTransactionSummary)
router.get('/monthly',protect,getMonthlyBreakdown)

export default router; 