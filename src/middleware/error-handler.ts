import { Request, Response, NextFunction, response } from "express";
import { ValidationError} from "express-validator";
import { ROUTE_NOT_FOUND, ROUTE_NOT_FOUND_MESSAGE, SERVER_ERROR, SERVER_ERROR_MESSAGE, SOMTING_WENT_WRONG_ERROR } from "../utils/messages";



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