"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = __importDefault(require("express"));
const controller_1 = require("./controller");
const constants_1 = require("../../utils/constants");
const router = express_1.default.Router();
exports.userRouter = router;
router.get(constants_1.GET_ALL_USERS, controller_1.getAllUsers);
router.post(constants_1.SIGNIN_USERS, controller_1.signinUser);
router.post(constants_1.GET_ALL_USERS, controller_1.insertUser);
router.post(`${constants_1.GET_ALL_USERS}/:id`, controller_1.getSingleUser);
router.delete(`${constants_1.GET_ALL_USERS}/:id`, controller_1.deleteUser);
