import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true, 
      min: 0, 
    },
    category: {
      type: String,
      required: true, 
    },
    narration: {
      type: String,
      required: true,
      maxlength: 500, 
    },
    budget_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Budget", 
      default: null, 
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true, 
    },
    type: {
      type: String,
      required: true,
      enum: ['expense', 'income'], 
    },
  },
  {
    timestamps: true, 
  }
);

const Transaction = mongoose.model("Transaction", transactionSchema);

export default Transaction;