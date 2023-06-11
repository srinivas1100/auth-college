import e, { Request, Response } from "express";
import User, { IUser } from "./model";
import { verifyPassword } from "../../middleware/hash-password";
import { Error } from "mongoose";
import { DatabaseConnectionError, errorHandler, handleApiError, sendApiErrorResponse, sendApiResponse } from "../../middleware/error-handler";
import { DELETE_USER_MESSAGE, PASSWORD_INCORRECT, USER_NOT_FOUND, USER_RETRIVED_SUCCESSFULLY } from "../../utils/messages";
// import User from "../schemas/user";
// import { hashPassword, verifyPassword } from "../helpers/bcrypt-helpers";
// import { errorFormeter, commonError } from "../helpers/api-error-handler";
// import { Error, MongooseError } from "mongoose";
// import ApiError from "../helpers/api-errors";
// import ApiSuccess from "../helpers/api-success";
// import UserValidationMessages from "../helpers/messages/user-validation-messages";

 export async function getAllUsers  (req: Request, res: Response)  {
  try {
    const user = await User.find();
    if (!user) return sendApiResponse({
      res: res, statusCode : 300, data: user,message:  "some error id comming"
    });
  
   return sendApiResponse({
     res: res, statusCode : 200, data: user,message:  "Users retrieved successfully"
   });

  } catch (error) {
   return sendApiResponse({
    res: res, statusCode : 400, data: error,message:  "Users retrieved successfully"
  });
  }
};

export async function signinUser  (req: Request, res: Response): Promise<Response>  {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) return sendApiResponse({
      res: res, statusCode : 404, data: user,message:  USER_NOT_FOUND
    });
    
   
    const ismatch = await verifyPassword(req.body.password, user.password);
    if (!ismatch) return  sendApiResponse({
      res: res, statusCode : 404, data: null,message:  PASSWORD_INCORRECT
    });
    user.generateToken();
    return sendApiResponse({
      res: res, statusCode : 200, data: user,message:  "Success"
    });
  } catch (error) {
    
    return  sendApiResponse({
      res: res, statusCode : 400, data: error,message:  "Failed"
    });
  }
};

export async function getSingleUser (req: Request, res: Response): Promise<Response>  {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return  sendApiResponse({
      res: res, statusCode : 404, data: user,message:  USER_NOT_FOUND
    });
    return  sendApiResponse({
      res: res, statusCode : 200, data: user,message:  USER_RETRIVED_SUCCESSFULLY
    });
  } catch (error) {
    return  sendApiResponse({
      res: res, statusCode : 400, data: error,message:  "Failed"
    });
  }
};

export async function insertUser (req: Request, res: Response): Promise<Response>  {
  try {
    const user = new User(req.body);
    const saveUser = await user.save();
    return sendApiResponse({
      res: res, statusCode : 200, data: saveUser,message:  "Success"
    });
  } catch (error) {
    return handleApiError(error,  res);
  }
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
      return sendApiResponse({
        res: res, statusCode : 200, data: user,message:  DELETE_USER_MESSAGE
      });
      
  
    } catch (error) {
      return sendApiResponse({
        res: res, statusCode : 400, data: error,message:  "Failed"
      });
      

    }
  };
  