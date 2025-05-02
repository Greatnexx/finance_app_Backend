import { protect } from '../middlewares/authMiddleWare';
import { getTransactionSummary } from '../../Controllers/Summary.controller/getSummary.controller';
import express from 'express'
import { getMonthlyBreakdown } from '../../Controllers/Summary.controller/getMonthlySummary.controller';
const router = express.Router();

router.get('/summary',protect,getTransactionSummary)
router.get('/monthly',protect,getMonthlyBreakdown)

export default router; 