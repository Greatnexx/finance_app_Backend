"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5
    }
}, { timestamps: true });
userSchema.virtual("transactions", {
    ref: "Transaction",
    localField: "_id",
    foreignField: "user_id"
});
const User = mongoose_1.default.model('User', userSchema);
exports.default = User;
//# sourceMappingURL=userModel.js.map