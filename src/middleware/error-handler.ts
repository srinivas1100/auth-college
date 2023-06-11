import { Request, Response, NextFunction, response } from "express";
import { Error as er } from "mongoose";
import { ValidationError } from "express-validator";
import { AN_UNEXPECTED_ERROR_OCCURRED, ROUTE_NOT_FOUND, ROUTE_NOT_FOUND_MESSAGE, SERVER_ERROR, SERVER_ERROR_MESSAGE, SOMTING_WENT_WRONG_ERROR, VALIDATION_ERROR } from "../utils/messages";



export abstract class CustomError extends Error{
    abstract statusCode: number;
    abstract message: string
    constructor(){
        super();
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeErrors(): {
        message: String;
        field?: String;
    }[];
}

 export const errorHandler = (err: Error, req: Request, res: Response) => {
    if(err instanceof CustomError){
        console.log(`${err.serializeErrors()}`);
        return res.status(200).send({
           
            statusCode: err.statusCode,
            message: err.message,
            errors: err.serializeErrors()
        })
    }
   
    return res.status(200).send({
        statusCode: 400,
        message: err.message
    })
}

export class RequestValidationError extends CustomError {
    statusCode= 400;
    message= "";
    constructor(private errors: ValidationError[]){
        super();
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors(){
        return this.errors.map(err => {
            return { message: err.msg, field: err.type}
        });
    }
}

export class DatabaseConnectionError extends CustomError {
    statusCode= 500;
    message = SERVER_ERROR;
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(): { message: string; field?: string | undefined; }[] {
        return [{ message: this.message, field: SERVER_ERROR_MESSAGE }]
    }
}

export class RouteNotFound extends CustomError{
    statusCode= 404;
    message=ROUTE_NOT_FOUND;
    constructor(){
        super();
        Object.setPrototypeOf(this, RouteNotFound.prototype);
    }
    serializeErrors() {
        return [{"message": this.message, field: ROUTE_NOT_FOUND_MESSAGE}]
    }
}

export class BadRequest extends CustomError{
    statusCode= 400;
    message = SOMTING_WENT_WRONG_ERROR;
    constructor(private error: Error){
        super();
        Object.setPrototypeOf(this, 
            BadRequest.prototype);
    }
    serializeErrors(): { message: String; field?: String | undefined; }[] {
        return [{message: this.message, field: this.error.message}]
    }
}

interface ApiResponse<T> {
    success: boolean;
    statusCode: number;
    message: string;
    data?: T;
  }

 export function sendApiResponse<T>({
    res, statusCode = 200, data, message ="Success"
 }: {
    res: Response,
    statusCode: number,
    data: T,
    message: string 
 } ): Response {
    const response: ApiResponse<T> = {
      success: statusCode === 200 ? true : false,
      statusCode: statusCode,
      message: message,
      data: data
    };
  
   return res.status(statusCode).json(response);
  }


export function sendApiErrorResponse<Error>({
    res, statusCode, message, data
}:{
    res: Response,
    statusCode: number,
    message: string,
    data: Error
}): Response {
    
    const response: ApiResponse<Error> = {
      success: false,
      statusCode: statusCode,
      message: message,
      data: data
    };
    
  
    return  res.status(statusCode).json(response);
  }

  function errorFormater(errorMessage: string): Record<string, string> {
    let errors: Record<string, string> = {};
    const allErrors = errorMessage.substring(errorMessage.indexOf(":") + 1).trim();
  
    const errorList = allErrors.split(",").map(a => a.trim());
  
    errorList.forEach((e) => {
      const [key, value] = e.split(':').map(a => a.trim());
      errors[key] = value;
    });
  
    return errors;
  }
  

 export function handleApiError(error: any, res: Response): Response {
    if (error instanceof er.ValidationError) {
      // Handle Mongoose validation error
      return sendApiErrorResponse({
        res: res,
        statusCode: 400,
        message: VALIDATION_ERROR,
        data: errorFormater(error.toString())
      });
    } else {
      // Handle other errors
      return sendApiErrorResponse({
        res: res,
        statusCode: 401,
        message: AN_UNEXPECTED_ERROR_OCCURRED,
        data: error
      });
    }
  }