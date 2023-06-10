import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const GenerateJwtToken = (id: string) => {
    const token = jwt.sign({ _id: id.toString() }, process.env.JWT_SEC || "");
    return token;
}

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
