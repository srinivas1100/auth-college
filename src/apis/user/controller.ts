import e, { Request, Response } from "express";
import User, { IUser } from "./model";
import { verifyPassword } from "../../middleware/hash-password";
import { DatabaseConnectionError, errorHandler } from "../../middleware/error-handler";
// import User from "../schemas/user";
// import { hashPassword, verifyPassword } from "../helpers/bcrypt-helpers";
// import { errorFormeter, commonError } from "../helpers/api-error-handler";
// import { Error, MongooseError } from "mongoose";
// import ApiError from "../helpers/api-errors";
// import ApiSuccess from "../helpers/api-success";
// import UserValidationMessages from "../helpers/messages/user-validation-messages";

 export async function getAllUsers  (req: Request, res: Response)  {
  try {
    // throw new DatabaseConnectionError();
    const user = await User.find();
    if (!user) return res.status(300).send("some error id comming");
   return res.status(200).send(user);
    // return ApiSuccess.sucessResponse({ res: res, object: user });
  } catch (error) {
    // return commonError({ res: res, error: error });
   return errorHandler(error as Error, req, res);
   //return res.status(200).send(error);
  }
};
interface CreateUserRequest {
  email: string;
  password: string;
}

export async function signinUser  (req: Request<{}, {}, CreateUserRequest>, res: Response): Promise<Response>  {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(404).send({"message": "user not found"});
    const ismatch = await verifyPassword(req.body.password, user.password);
    if (!ismatch) return res.status(404).send({"message": "un authorized"});
    user.generateToken();
    return res.status(200).send(user);
  } catch (error) {
    return  res.status(200).send(error);
  }
};

export async function getSingleUser (req: Request, res: Response): Promise<Response>  {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).send({"message": "user not found"});
    // if (!user) return ApiError.noResorseFound({ res: res });
    return res.status(200).send(user);
    // return ApiSuccess.sucessResponse({ res: res, object: user });
  } catch (error) {
    return  res.status(200).send(error);
  }
};

export async function insertUser (req: Request, res: Response): Promise<Response>  {
  try {
    const user = new User(req.body);
    const saveUser = await user.save();
    // console.log(saveUser);
    return res.status(200).send(saveUser);
  } catch (error) {
    return  res.status(200).send(error);
};
}
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
  
  export async function deleteUser (req: Request, res: Response): Promise<Response>  {
    try {
      const user = await User.deleteOne({ _id: req.params.id });
      return res.status(200).send({"message": "user deleted successfully"});
      // return ApiSuccess.sucessResponse({ res, object: user, message: UserValidationMessages.DELETE_USER_MESSAGE });
      // return null;
    } catch (error) {
      return   res.status(200).send(error);
    }
  };
  