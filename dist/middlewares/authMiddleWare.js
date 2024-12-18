"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.protect = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const Error_1 = require("../utils/Errors/Error");
const Error_2 = require("../utils/Errors/Error");
const protect = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let token;
    try {
        if (req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
            const secretKey = process.env.JWT_SECRET || 'your-secret-key'; // Use your secret key
            // Verify the token
            const user = jsonwebtoken_1.default.verify(token, secretKey);
            req.user = user;
            return next();
        }
        // If no token is found
        res.status(401);
        throw new Error(Error_1.ErrorCode.TOKEN_EXPIRED);
    }
    catch (error) {
        res.status(401);
        res.json({
            error: true,
            code: (0, Error_2.getErrorCode)(error.message),
            message: error.message,
        });
    }
});
exports.protect = protect;
//# sourceMappingURL=authMiddleWare.js.map