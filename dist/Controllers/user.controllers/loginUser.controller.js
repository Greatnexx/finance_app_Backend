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
exports.loginUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validationService_1 = __importDefault(require("../../services/validationService"));
const userModel_1 = __importDefault(require("../../models/user.models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Error_1 = require("../../utils/Errors/Error");
const generateToken_1 = __importDefault(require("../../utils/Token/generateToken"));
exports.loginUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = yield validationService_1.default.validateObject({
        email: "string|required",
        password: "string|required|min:5"
    }, Object.assign({}, req === null || req === void 0 ? void 0 : req.body));
    if (validation.error) {
        res.status(403).json(validation);
        return;
    }
    const { email, password } = req.body;
    const user = yield userModel_1.default.findOne({ email: email });
    if (!user) {
        throw new Error(Error_1.ErrorCode.USER_NOT_FOUND);
    }
    const isMatch = yield bcryptjs_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error("Invalid Credentials");
    }
    const accessToken = (0, generateToken_1.default)(user === null || user === void 0 ? void 0 : user._id.toString());
    res.status(200).json({
        success: true,
        data: {
            _id: user._id,
            name: user.username,
            email: user.email,
            token: accessToken,
        },
        message: "Login Succefull"
    });
}));
//# sourceMappingURL=loginUser.controller.js.map