"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleApiError = exports.sendApiErrorResponse = exports.sendApiResponse = exports.BadRequest = exports.RouteNotFound = exports.DatabaseConnectionError = exports.RequestValidationError = exports.errorHandler = exports.CustomError = void 0;
const mongoose_1 = require("mongoose");
const messages_1 = require("../utils/messages");
class CustomError extends Error {
    constructor() {
        super();
        Object.setPrototypeOf(this, CustomError.prototype);
    }
}
exports.CustomError = CustomError;
const errorHandler = (err, req, res) => {
    if (err instanceof CustomError) {
        console.log(`${err.serializeErrors()}`);
        return res.status(200).send({
            statusCode: err.statusCode,
            message: err.message,
            errors: err.serializeErrors()
        });
    }
    return res.status(200).send({
        statusCode: 400,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
class RequestValidationError extends CustomError {
    constructor(errors) {
        super();
        this.errors = errors;
        this.statusCode = 400;
        this.message = "";
        Object.setPrototypeOf(this, RequestValidationError.prototype);
    }
    serializeErrors() {
        return this.errors.map(err => {
            return { message: err.msg, field: err.type };
        });
    }
}
exports.RequestValidationError = RequestValidationError;
class DatabaseConnectionError extends CustomError {
    constructor() {
        super();
        this.statusCode = 500;
        this.message = messages_1.SERVER_ERROR;
        Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, field: messages_1.SERVER_ERROR_MESSAGE }];
    }
}
exports.DatabaseConnectionError = DatabaseConnectionError;
class RouteNotFound extends CustomError {
    constructor() {
        super();
        this.statusCode = 404;
        this.message = messages_1.ROUTE_NOT_FOUND;
        Object.setPrototypeOf(this, RouteNotFound.prototype);
    }
    serializeErrors() {
        return [{ "message": this.message, field: messages_1.ROUTE_NOT_FOUND_MESSAGE }];
    }
}
exports.RouteNotFound = RouteNotFound;
class BadRequest extends CustomError {
    constructor(error) {
        super();
        this.error = error;
        this.statusCode = 400;
        this.message = messages_1.SOMTING_WENT_WRONG_ERROR;
        Object.setPrototypeOf(this, BadRequest.prototype);
    }
    serializeErrors() {
        return [{ message: this.message, field: this.error.message }];
    }
}
exports.BadRequest = BadRequest;
function sendApiResponse({ res, statusCode = 200, data, message = "Success" }) {
    const response = {
        success: statusCode === 200 ? true : false,
        statusCode: statusCode,
        message: message,
        data: data
    };
    return res.status(statusCode).json(response);
}
exports.sendApiResponse = sendApiResponse;
function sendApiErrorResponse({ res, statusCode, message, data }) {
    const response = {
        success: false,
        statusCode: statusCode,
        message: message,
        data: data
    };
    return res.status(statusCode).json(response);
}
exports.sendApiErrorResponse = sendApiErrorResponse;
function errorFormater(errorMessage) {
    let errors = {};
    const allErrors = errorMessage.substring(errorMessage.indexOf(":") + 1).trim();
    const errorList = allErrors.split(",").map(a => a.trim());
    errorList.forEach((e) => {
        const [key, value] = e.split(':').map(a => a.trim());
        errors[key] = value;
    });
    return errors;
}
function handleApiError(error, res) {
    if (error instanceof mongoose_1.Error.ValidationError) {
        // Handle Mongoose validation error
        return sendApiErrorResponse({
            res: res,
            statusCode: 400,
            message: messages_1.VALIDATION_ERROR,
            data: errorFormater(error.toString())
        });
    }
    else {
        // Handle other errors
        return sendApiErrorResponse({
            res: res,
            statusCode: 401,
            message: messages_1.AN_UNEXPECTED_ERROR_OCCURRED,
            data: error
        });
    }
}
exports.handleApiError = handleApiError;
