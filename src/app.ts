import express from 'express'
import cors from "cors"
import { errorHandler, notFound } from './middlewares/errorHandler';
import userRoutes from './routes/user.Routes/userRoute';
import BudgetRoutes  from './routes/budget.Routes/budgetRoute';
import  TransactionRoutes  from './routes/transaction.Routes/transactionRoute'
import  SummaryRoutes  from './routes/summary.Routes/summaryRoutes'

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
