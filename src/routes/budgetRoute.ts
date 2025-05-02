import express from 'express';
import { createBudget } from '../Controllers/Budgets/createBudget.controller';
import {protect} from "../middlewares/authMiddleWare"
import { deleteBudget } from '../Controllers/Budgets/deleteBudget.controller';
import { getAllBudgets } from '../Controllers/Budgets/getAllBudget.controller';
import { getSingleBudget } from '../Controllers/Budgets/getSingleBudget.controller';
import { updateBudget } from '../Controllers/Budgets/updateBudget.controller';
import { validateBudget } from '../services/validation';
const router = express.Router();

router.post('/',protect,validateBudget,createBudget)
router.delete('/:id',protect,deleteBudget)
router.get('/',protect ,getAllBudgets)
router.get('/:id',protect,getSingleBudget)
router.put('/:id',protect,updateBudget)


export default router; 