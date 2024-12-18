import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    total_amount: {
        type: Number,
        required: true
    },
    duration: {
        type: String,
        required: true,
        enum: ['weekly', 'monthly', 'yearly'],
        default: "weekly",
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: true
    }
}, { timestamps: true }); 

budgetSchema.virtual("transactions",{
    ref: "Transaction",
    localField: "_id",
    foreignField: "budget_id",
});

const Budget = mongoose.model('Budget', budgetSchema); 
export default Budget; 