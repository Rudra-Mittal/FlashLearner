"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controllers/user.controller");
exports.userRouter = express_1.default.Router();
exports.userRouter.post('/register', user_controller_1.register);
exports.userRouter.post('/login', user_controller_1.login);
