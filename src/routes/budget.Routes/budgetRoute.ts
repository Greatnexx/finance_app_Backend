import express from 'express';
import { createBudget } from '../../Controllers/Budgets.controller/createBudget.controller';
import {protect} from "../../middlewares/authMiddleWare"
import { deleteBudget } from '../../Controllers/Budgets.controller/deleteBudget.controller';
import { getAllBudgets } from '../../Controllers/Budgets.controller/getAllBudget.controller';
import { getSingleBudget } from '../../Controllers/Budgets.controller/getSingleBudget.controller';
import { updateBudget } from '../../Controllers/Budgets.controller/updateBudget.controller';
import { validateBudget } from 'Services/validation';
const router = express.Router();

router.post('/',protect,validateBudget,createBudget)
router.delete('/:id',protect,deleteBudget)
router.get('/',protect ,getAllBudgets)
router.get('/:id',protect,getSingleBudget)
router.put('/:id',protect,updateBudget)


export default router;