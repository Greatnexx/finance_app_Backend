import dotenv from "dotenv";
import app from "./app";
import connectDb from "./config/db";
import redis from "./config/redis";

dotenv.config();

// Connect to Database
connectDb();

// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

// close redis connection on exit
const shutdown = async () => {
    console.log("Closing Redis connection...");
    try {
      await redis.quit();
      console.log("Redis connection closed.");
    } catch (error) {
      console.error("Error closing Redis:", error);
    }
    process.exit(0);
  };
  
  process.on("SIGINT", shutdown);
  process.on("SIGTERM", shutdown);
  