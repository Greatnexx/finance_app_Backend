import dotenv from "dotenv";
import app from "../src/app";
import connectDb from "../src/config/db";

dotenv.config();

// Connect to Database
connectDb();



// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
