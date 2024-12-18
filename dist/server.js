"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const app_1 = __importDefault(require("./app"));
const db_1 = __importDefault(require("./config/db"));
dotenv_1.default.config();
// Connect to Database
(0, db_1.default)();
// Start Server
const port = process.env.PORT || 3000;
app_1.default.listen(port, () => console.log(`Server is running on port ${port}`));
//# sourceMappingURL=server.js.map