import request from "supertest";

import app from "../src/app";

import User from "../src/apis/user/model";
import { GET_ALL_USERS } from "../src/utils/constants";
import mongoose from "mongoose";

// const request = require("supertest");
// const app = require("../src/app");
// const GlobalValidationMessages = require("../src/helpers/messages/global-validation-message");
// const UserValidationMessages = require("../src/helpers/messages/user-validation-messages");
// const User = require("../src/schemas/user");
// const { objectId, user1, deleteAllFunction, updateUser, testUser1, userEmailRequired, emailExists, enterValidEmail, phoneNumberRequired, emailNotExists, passwordIncorect, testUserToken, noResorseFoundToken, updateTestUser1 } = require("../tests/helpers/testUserData")

const deleteAllFunction = async () => {
    await User.deleteMany();
};


beforeAll(async () => {
    await deleteAllFunction();
});

const testUserId =  new mongoose.Types.ObjectId();

const testUser = {
    "_id": testUserId,
    "email": "test@gmail.com",
    "password": "123456",
    "name": "test firstname",
    "phoneNumber": "9876543210"
}


describe('GET all user data', () => {
    it("SUCESS RESPONSE", async function () {
        // expect(true).toBe(true);
        const response = await request(app).get(GET_ALL_USERS);
        expect(response.statusCode).toEqual(200);
    })
})

describe('User Register API', () => {
    it("Sucess registation", async function () {
        const response = await request(app).post(GET_ALL_USERS).send(testUser);
        expect(response.body._id).toEqual(testUserId.toString());
    });
    // it("Email is required", async function () {
    //     const response = await request(app).post("/user").send(userEmailRequired);
    //     expect(response.statusCode).toEqual(404);
    //     expect(response.body.code).toEqual(404);
    //     expect(response.body.message).toEqual(UserValidationMessages.VALIDATION_ERROR);
    // })
    // it("Email is allready exists", async function () {
    //     const response = await request(app).post("/user").send(emailExists);
    //     expect(response.statusCode).toEqual(400);
    //     expect(response.body.code).toEqual(400);
    //     expect(response.body.message).toEqual(UserValidationMessages.SOMTING_WENT_WRONG_ERROR);
    // })
    // it("Enter valid email", async function () {
    //     const response = await request(app).post("/user").send(enterValidEmail);
    //     expect(response.statusCode).toEqual(404);
    //     expect(response.body.code).toEqual(404);
    //     expect(response.body.message).toEqual(UserValidationMessages.VALIDATION_ERROR);
    // })
    // it("Phone number required", async function () {
    //     const response = await request(app).post("/user").send(phoneNumberRequired);
    //     expect(response.statusCode).toEqual(404);
    //     expect(response.body.code).toEqual(404);
    //     expect(response.body.message).toEqual(UserValidationMessages.VALIDATION_ERROR);
    // })
})

// describe('User Login API', () => {
//     it("User login success response", async function () {
//         const response = await request(app).get("/user/login").send({
//             email: testUser1.email,
//             password: testUser1.password
//         });
//         expect(response.statusCode).toEqual(200);
//         expect(response.body.object.email).toEqual(testUser1.email);
//     });
//     it("Email not exists login", async function () {
//         const response = await request(app).get("/user/login").send({
//             email: emailNotExists,
//             password: testUser1.password
//         });
//         expect(response.statusCode).toEqual(400);
//         expect(response.body.message).toEqual(GlobalValidationMessages.NO_USER_FOUND_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE);
//     });
//     it("Password miss match", async function () {
//         const response = await request(app).get("/user/login").send({
//             email: testUser1.email,
//             password: passwordIncorect
//         });
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     })

// })

// describe('Get single user profile API', () => {
//     it("User profile success", async function () {
//         const response = await request(app).get("/user/me").set('Authorization', `Bearer ${testUserToken}`)
//         expect(response.statusCode).toEqual(200);
//         expect(response.body.object.email).toEqual(testUser1.email);
//     });
//     it("User profile success", async function () {
//         const response = await request(app).get("/user/me").set('Authorization', `Bearer ${noResorseFoundToken}`)
//         expect(response.statusCode).toEqual(400);
//         expect(response.body.message).toEqual(GlobalValidationMessages.NO_USER_FOUND_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.USER_EMAIL_DOES_NOT_EXISTS_MESSAGE);
//     });
//     it("User not authorized", async function () {
//         const response = await request(app).get("/user/me").set('Authorization', `Bearer a`)
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     });
// })

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

// describe('Delete user API', () => {
//     it('Delete user success response', async function () {
//         const response = await request(app).delete("/user").set('Authorization', `Bearer ${testUserToken}`);
//         expect(response.statusCode).toEqual(200);
//         expect(response.body.message).toEqual(UserValidationMessages.DELETE_USER_MESSAGE);
//     });
//     it("User not authorized", async function () {
//         const response = await request(app).delete("/user").set('Authorization', `Bearer ${noResorseFoundToken}a`);
//         expect(response.statusCode).toEqual(401);
//         expect(response.body.message).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR);
//         expect(response.body.error).toEqual(GlobalValidationMessages.UNAUTHORIZED_ERROR_MESSAGE);
//     });
// })