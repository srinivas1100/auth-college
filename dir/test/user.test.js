"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../src/app"));
const model_1 = __importDefault(require("../src/apis/user/model"));
const constants_1 = require("../src/utils/constants");
const mongoose_1 = __importDefault(require("mongoose"));
const messages_1 = require("../src/utils/messages");
// const request = require("supertest");
// const app = require("../src/app");
// const GlobalValidationMessages = require("../src/helpers/messages/global-validation-message");
// const UserValidationMessages = require("../src/helpers/messages/user-validation-messages");
// const User = require("../src/schemas/user");
// const { objectId, user1, deleteAllFunction, updateUser, testUser1, userEmailRequired, emailExists, enterValidEmail, phoneNumberRequired, emailNotExists, passwordIncorect, testUserToken, noResorseFoundToken, updateTestUser1 } = require("../tests/helpers/testUserData")
const deleteAllFunction = () => __awaiter(void 0, void 0, void 0, function* () {
    yield model_1.default.deleteMany();
});
beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield deleteAllFunction();
}));
const testUserId = new mongoose_1.default.Types.ObjectId();
const testUserId2 = new mongoose_1.default.Types.ObjectId();
const testUserId3 = new mongoose_1.default.Types.ObjectId();
const testUserId4 = new mongoose_1.default.Types.ObjectId();
const emailNotExistes = "srinivasu2233@gmail.com";
const passwordIncorect = "1234567";
const testUser = {
    "_id": testUserId,
    "email": "test@gmail.com",
    "password": "123456",
    "name": "test firstname",
    "phoneNumber": "9876543210"
};
const userEmailRequired = {
    "_id": testUserId2,
    "password": "123456",
    "name": "test firstname",
    "phoneNumber": "9876543210"
};
const userEmailExists = {
    "_id": testUserId3,
    "email": "test@gmail.com",
    "password": "123456",
    "name": "test firstname",
    "phoneNumber": "9876543210"
};
const validEmailAddress = {
    "_id": testUserId4,
    "email": "testgmail.com",
    "password": "123456",
    "name": "test firstname",
    "phoneNumber": "9876543210"
};
describe('GET all user data', () => {
    it("SUCESS RESPONSE", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).get(constants_1.GET_ALL_USERS);
            expect(response.statusCode).toEqual(200);
        });
    });
});
describe('User Register API', () => {
    it("Sucess registation", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.GET_ALL_USERS).send(testUser);
            expect(response.body.data._id).toEqual(testUserId.toString());
        });
    });
    it("Email is required", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.GET_ALL_USERS).send(userEmailRequired);
            expect(response.statusCode).toEqual(400);
            expect(response.body.statusCode).toEqual(400);
            expect(response.body.message).toEqual(messages_1.VALIDATION_ERROR);
        });
    });
    it("Email is allready exists", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.GET_ALL_USERS).send(userEmailExists);
            expect(response.statusCode).toEqual(401);
            expect(response.body.statusCode).toEqual(401);
            expect(response.body.message).toEqual(messages_1.AN_UNEXPECTED_ERROR_OCCURRED);
        });
    });
    it("Enter valid email", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.GET_ALL_USERS).send(validEmailAddress);
            expect(response.statusCode).toEqual(400);
            expect(response.body.statusCode).toEqual(400);
            expect(response.body.message).toEqual(messages_1.VALIDATION_ERROR);
        });
    });
});
describe('User Login API', () => {
    it("User login success response", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.SIGNIN_USERS).send({
                email: testUser.email,
                password: testUser.password
            });
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.email).toEqual(testUser.email);
        });
    });
    it("Email not exists login", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.SIGNIN_USERS).send({
                email: emailNotExistes,
                password: testUser.password
            });
            expect(response.statusCode).toEqual(404);
            expect(response.body.message).toEqual(messages_1.USER_NOT_FOUND);
        });
    });
    it("Password miss match", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(constants_1.SIGNIN_USERS).send({
                email: testUser.email,
                password: passwordIncorect
            });
            expect(response.statusCode).toEqual(404);
            expect(response.body.message).toEqual(messages_1.PASSWORD_INCORRECT);
        });
    });
});
describe('Get single user profile API', () => {
    it("User profile success", function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).post(`${constants_1.GET_ALL_USERS}/${testUser._id}`);
            console.log(response);
            // .set('Authorization', `Bearer ${testUserToken}`)
            expect(response.statusCode).toEqual(200);
            expect(response.body.data.email).toEqual(testUser.email);
        });
    });
    // it("User profile success", async function () {
    //     const response = await request(app).get("/user/me").set('Authorization', `Bearer ${noResorseFoundToken}`)
    //     expect(response.statusCode).toEqual(400);
    //     expect(response.body.message).toEqual(GlobalValidationMessages.NO_USER_FOUND_ERROR);
    //     expect(response.body.error).toEqual(GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE);
    // });
    // it("User not authorized", async function () {
    //     const response = await request(app).get("/user/me").set('Authorization', `Bearer a`)
    //     expect(response.statusCode).toEqual(401);
    //     expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
    //     expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
    // });
});
describe('Delete user API', () => {
    it('Delete user success response', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield (0, supertest_1.default)(app_1.default).delete(`${constants_1.GET_ALL_USERS}/${testUser._id}`);
            // .set('Authorization', `Bearer ${testUserToken}`);
            expect(response.statusCode).toEqual(200);
            expect(response.body.message).toEqual(messages_1.DELETE_USER_MESSAGE);
        });
    });
    //
    // it("User not authorized", async function () {
    //     const response = await request(app).delete("/user").set('Authorization', `Bearer ${noResorseFoundToken}a`);
    //     expect(response.statusCode).toEqual(401);
    //     expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
    //     expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
    // });
});
// describe('Update user profile API', () => {
//     it('Update user profile success', async function () {
//         const response = await request(app).put("/user").send(updateTestUser1).set('Authorization', `Bearer ${testUserToken}`);
//         expect(response.statusCode).toEqual(200);
//         expect(response.body.message).toEqual(GlobalValidationMessages.SUCCESSFULL_MESSAGE);
//         expect(response.body.object.phoneNumber).toEqual(updateTestUser1.phoneNumber);
//     });
//     it("User not authorized", async function () {
//         const response = await request(app).put("/user").send(updateTestUser1).set('Authorization', `Bearer a`)
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     });
// })
// describe('Logout user API', () => {
//     // it('Logout user success response', async function () {
//     // })
//     it("No user found", async function () {
//         const response = await request(app).post("/user/logout").set('Authorization', `Bearer ${noResorseFoundToken}`);
//         expect(response.statusCode).toEqual(400);
//         expect(response.body.message).toEqual(GlobalValidationMessages.NO_USER_FOUND_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE);
//     });
//     it("User not authorized", async function () {
//         const response = await request(app).post("/user/logout").set('Authorization', `Bearer a`)
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     });
// })
// describe('Logout all user API', () => {
//     it('Logout all api success response', async function () {
//         const response = await request(app).post("/user/logoutall").set('Authorization', `Bearer ${testUserToken}`);
//         expect(response.statusCode).toEqual(200);
//         expect(response.body.object.email).toEqual(testUser1.email);
//         expect(response.body.object.tokens).toEqual([]);
//     })
//     it("No user found", async function () {
//         const response = await request(app).post("/user/logoutall").set('Authorization', `Bearer ${noResorseFoundToken}`);
//         expect(response.statusCode).toEqual(400);
//         expect(response.body.message).toEqual(GlobalValidationMessages.NO_USER_FOUND_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE);
//     });
//     it("User not authorized", async function () {
//         const response = await request(app).post("/user/logoutall").set('Authorization', `Bearer a`)
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     });
// })
