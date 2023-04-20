import { Request, Response, NextFunction, response } from "express";
import { ValidationError} from "express-validator";



export abstract class CustomError extends Error{
    abstract statusCode: number;
    constructor(){
        super();
        Object.setPrototypeOf(this, CustomError.prototype);
    }
    abstract serializeErrors(): {
        message: String;
        field?: String;
    }[];
}

 export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if(err instanceof CustomError){
        console.log('request validation error')
        return res.status(err.statusCode).send({
            errors: err.serializeErrors()
        })
    }
   
    response.status(200).send({
        message: err.message
    })
}

export class RequestValidationError extends CustomError {
    statusCode= 400;

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
    reason = "Error Connecting to Database"
    constructor(){
        super();
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors(): { message: String; field?: String | undefined; }[] {
        return [{ message: this.reason }]
    }
}

export class NotFoundError extends CustomError{
    statusCode= 404;
    constructor(){
        super();
        Object.setPrototypeOf(this, NotFoundError.prototype);
    }
    serializeErrors() {
        return [{"message": "Not Found"}]
    }
    
}