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
const express_1 = __importDefault(require("express"));
const database_1 = __importDefault(require("./config/database"));
require("express-async-errors");
(0, database_1.default)();
const router_1 = require("./apis/user/router");
const error_handler_1 = require("./middleware/error-handler");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(router_1.userRouter);
app.get("*", () => __awaiter(void 0, void 0, void 0, function* () {
    throw new error_handler_1.RouteNotFound();
}));
app.use(error_handler_1.errorHandler);
exports.default = app;
