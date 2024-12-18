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
exports.createUser = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const validationService_1 = __importDefault(require("../../services/validationService"));
const userModel_1 = __importDefault(require("../../models/user.models/userModel"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const Error_1 = require("../../utils/Errors/Error");
exports.createUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const validation = yield validationService_1.default.validateObject({
        username: "string|required",
        email: "string|required",
        password: "string|required"
    }, Object.assign({}, req === null || req === void 0 ? void 0 : req.body));
    if (validation.error) {
        res.status(403).json(validation);
        return;
    }
    const { username, email, password } = req.body;
    const existingUser = yield userModel_1.default.findOne({ email: email });
    if (existingUser) {
        res.status(409);
        throw new Error(Error_1.ErrorCode.USER_ALREADY_EXISTS);
    }
    const hasPassword = yield bcryptjs_1.default.hash(password, 10);
    const newUser = yield userModel_1.default.create({
        username,
        email,
        password: hasPassword
    });
    const savedUser = yield newUser.save();
    if (!savedUser) {
        throw new Error('Failed to save user');
    }
    res.status(201).json({
        success: true,
        data: {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
        },
        message: 'User created successfully',
    });
}));
//# sourceMappingURL=createUser.controller.js.map