import dotenv from "dotenv";
// import app from "../src/app";
import connectDb from "../src/config/db";
import userRoutes from "../src/routes/user.Routes/userRoute";
import BudgetRoutes from "../src/routes/budget.Routes/budgetRoute"
import TransactionRoutes from "../src/routes/transaction.Routes/transactionRoute"
import express from "express"
import cors from "cors"

dotenv.config();

// Connect to Database
connectDb();

const app = express();
app.use(cors())
app.use(express.json());

app.use('/api',userRoutes)
app.use('/api/budgets',BudgetRoutes)
app.use('/api/transactions',TransactionRoutes)





// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
