"use strict";
// import GlobalValidationMessages from "./messages/global-validation-message";
// import UserValidationMessages from "./messages/user-validation-messages";
// class ApiError {
// code: number;
// message: string;
// error: string;
// constructor(code: number, message: string, error: string) {
// this.code = code;
// this.message = message;
// this.error = error;
// }
// static badRequest({ res, message, code, error }: ErrorOptions) {
// return res.status(code ?? 400).send(new ApiError(code ?? 400, message ?? UserValidationMessages.SOMTING_WENT_WRONG_ERROR, error))
// }
// static validationError({ res, code, error }: ErrorOptions) {
// return res.status(404).send(new ApiError(404, UserValidationMessages.VALIDATION_ERROR, error))
// }
// static unAuthorized({ res }: ErrorOptions) {
// return res.status(401).send(new ApiError(401, GlobalValidationMessages.UNAUTHORIZED_ERROR, GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE))
// }
// static noResorseFound({ res, code, error, message }: ErrorOptions) {
// return res.status(code ?? 400).send(new ApiError(code ?? 400, error ?? GlobalValidationMessages.NO_USER_FOUND_ERROR, message ?? GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE))
// }
// static serverError({ res }: ErrorOptions) {
// return res.status(400).send(new ApiError(400, GlobalValidationMessages.SERVER_ERROR, GlobalValidationMessages.SERVER_ERROR_MESSAGE))
// }
// }
// export default ApiError;
