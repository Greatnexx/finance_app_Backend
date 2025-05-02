import express from 'express'
import cors from "cors"
import { errorHandler, notFound } from './middlewares/errorHandler';
import userRoutes from './routes/userRoute';
import BudgetRoutes  from './routes/budgetRoute';
import  TransactionRoutes  from './routes/transactionRoute'
import  SummaryRoutes  from './routes/summaryRoutes'

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

app.use("/test", async(req, res) => {
    res.send("Hello from server")
})


app.use('/api',userRoutes)
app.use('/api/budgets',BudgetRoutes)
app.use('/api/transactions',TransactionRoutes)
app.use('/api/insights',SummaryRoutes)
app.use('/api/insights',SummaryRoutes)

app.use(notFound);
app.use(errorHandler);

export default app;
