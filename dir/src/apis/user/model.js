"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const hash_password_1 = require("../../middleware/hash-password");
const jwt_1 = require("../../middleware/jwt");
const messages_1 = require("../../utils/messages");
// import { NextFunction } from 'express';
const validateEmail = (email) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};
var Gender;
(function (Gender) {
    Gender["Male"] = "male";
    Gender["Female"] = "female";
    Gender["Other"] = "other";
})(Gender || (Gender = {}));
var UserType;
(function (UserType) {
    UserType["Student"] = "student";
    UserType["Teacher"] = "teacher";
    UserType["College"] = "college";
})(UserType || (UserType = {}));
const UserSchema = new mongoose_1.Schema({
    name: { type: String, require: true,
        trim: true },
    email: {
        type: String,
        trim: true,
        required: [true, messages_1.EMAIL_IS_REQUIRED],
        unique: true,
        validate: [validateEmail, messages_1.VALID_EMAIL_ADDRESS],
        index: {
            unique: true
        },
    },
    gender: { type: String, enum: Object.values(Gender) },
    password: { type: String, required: true,
        trim: true, },
    fcmToken: { type: String },
    phoneNumber: { type: String },
    verifyPhone: { type: Boolean, default: false },
    welcome: { type: Boolean, default: false },
    userType: { type: String, enum: Object.values(UserType) },
    accessToken: { type: String }
});
UserSchema.pre("save", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        if (user.isModified("password")) {
            user.password = yield (0, hash_password_1.hashPassword)(user.password);
        }
        next();
    });
});
UserSchema.methods.generateToken = function () {
    return __awaiter(this, void 0, void 0, function* () {
        const user = this;
        const token = (0, jwt_1.GenerateJwtToken)(user._id.toString());
        user.accessToken = token;
        yield user.save();
        return token;
    });
};
// Export the model and return your IUser interface
const User = mongoose_1.default.model('User', UserSchema);
exports.default = User;
