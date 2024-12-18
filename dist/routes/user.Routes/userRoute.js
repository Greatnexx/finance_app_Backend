"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const createUser_controller_1 = require("../../Controllers/user.controllers/createUser.controller");
const loginUser_controller_1 = require("../../Controllers/user.controllers/loginUser.controller");
const router = express_1.default.Router();
router.post('/register', createUser_controller_1.createUser);
router.post('/login', loginUser_controller_1.loginUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map