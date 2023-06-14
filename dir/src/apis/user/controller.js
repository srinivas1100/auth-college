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
exports.deleteUser = exports.insertUser = exports.getSingleUser = exports.signinUser = exports.getAllUsers = void 0;
const model_1 = __importDefault(require("./model"));
const hash_password_1 = require("../../middleware/hash-password");
const error_handler_1 = require("../../middleware/error-handler");
const messages_1 = require("../../utils/messages");
// import User from "../schemas/user";
// import { hashPassword, verifyPassword } from "../helpers/bcrypt-helpers";
// import { errorFormeter, commonError } from "../helpers/api-error-handler";
// import { Error, MongooseError } from "mongoose";
// import ApiError from "../helpers/api-errors";
// import ApiSuccess from "../helpers/api-success";
// import UserValidationMessages from "../helpers/messages/user-validation-messages";
function getAllUsers(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_1.default.find();
            if (!user)
                return (0, error_handler_1.sendApiResponse)({
                    res: res, statusCode: 300, data: user, message: "some error id comming"
                });
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 200, data: user, message: "Users retrieved successfully"
            });
        }
        catch (error) {
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 400, data: error, message: "Users retrieved successfully"
            });
        }
    });
}
exports.getAllUsers = getAllUsers;
;
function signinUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_1.default.findOne({ email: req.body.email });
            if (!user)
                return (0, error_handler_1.sendApiResponse)({
                    res: res, statusCode: 404, data: user, message: messages_1.USER_NOT_FOUND
                });
            const ismatch = yield (0, hash_password_1.verifyPassword)(req.body.password, user.password);
            if (!ismatch)
                return (0, error_handler_1.sendApiResponse)({
                    res: res, statusCode: 404, data: null, message: messages_1.PASSWORD_INCORRECT
                });
            user.generateToken();
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 200, data: user, message: "Success"
            });
        }
        catch (error) {
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 400, data: error, message: "Failed"
            });
        }
    });
}
exports.signinUser = signinUser;
;
function getSingleUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_1.default.findById(req.params.id);
            if (!user)
                return (0, error_handler_1.sendApiResponse)({
                    res: res, statusCode: 404, data: user, message: messages_1.USER_NOT_FOUND
                });
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 200, data: user, message: messages_1.USER_RETRIVED_SUCCESSFULLY
            });
        }
        catch (error) {
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 400, data: error, message: "Failed"
            });
        }
    });
}
exports.getSingleUser = getSingleUser;
;
function insertUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = new model_1.default(req.body);
            const saveUser = yield user.save();
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 200, data: saveUser, message: "Success"
            });
        }
        catch (error) {
            return (0, error_handler_1.handleApiError)(error, res);
        }
    });
}
exports.insertUser = insertUser;
// export const updateUser = async (req: Request, res: Response) => {
//   try {
//     const userObject: any = {};
//     req.body.name === "" ? null : (userObject["name"] = req.body.name);
//     req.body.email === ""
//       ? null
//       : (userObject["email"] = req.body.email);
//     req.body.phoneNumber === ""
//       ? null
//       : (userObject["phoneNumber"] = req.body.phoneNumber);
//     req.body.password === ""
//       ? null
//       : (userObject["password"] = await hashPassword(req.body.password));
//     req.body.usertype === ""
//       ? null
//       : (userObject["usertype"] = req.body.usertype);
//     req.body.dateOfBirth === ""
//       ? null
//       : (userObject["dateOfBirth"] = req.body.dateOfBirth);
//     req.body.gender === "" ? null : (userObject["gender"] = req.body.gender);
//     req.body.image === "" ? null : (userObject["image"] = req.body.image);
//     await User.findOneAndUpdate({ _id: req.params.id }, userObject);
//     return ApiSuccess.sucessResponse({ res: res, object: userObject });
//   } catch (err) {
//     return commonError({ res: res, error: err });
//   }
// };
// export const logoutUser = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const user = await User.findById({ _id: req.id });
//       if (!user) return ApiError.noResorseFound({ res });
//       user.tokens = user.tokens.filter((a) => a.token !== req.token);
//       user.save();
//       return ApiSuccess.sucessResponse({ res, object: user });
//     } catch (error) {
//       return commonError({ res, error });
//     }
//   };
//   export const logoutAllUsers = async (req: Request, res: Response): Promise<Response> => {
//     try {
//       const user = await User.findById({ _id: req.id });
//       if (!user) return ApiError.noResorseFound({ res });
//       user.tokens = [];
//       user.save();
//       return ApiSuccess.sucessResponse({ res, object: user });
//     } catch (err) {
//       return commonError({ res, error: err });
//     }
//   };
function deleteUser(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const user = yield model_1.default.deleteOne({ _id: req.params.id });
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 200, data: user, message: messages_1.DELETE_USER_MESSAGE
            });
        }
        catch (error) {
            return (0, error_handler_1.sendApiResponse)({
                res: res, statusCode: 400, data: error, message: "Failed"
            });
        }
    });
}
exports.deleteUser = deleteUser;
;
