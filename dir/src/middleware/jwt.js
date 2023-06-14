"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GenerateJwtToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const GenerateJwtToken = (id) => {
    const token = jsonwebtoken_1.default.sign({ _id: id.toString() }, process.env.JWT_SEC || "");
    return token;
};
exports.GenerateJwtToken = GenerateJwtToken;
// export async function verifyJwtToken( token: string, req: Request, res: Response, next: NextFunction ) {
//     try {
//         var isValid =
//             jwt.verify(token, process.env.JWT_SEC);
//         req.id = isValid._id;
//         req.token = token;
//         return next();
//     } catch (error) {
//         return commonError({ res: res, error: error })
//     }
// }
