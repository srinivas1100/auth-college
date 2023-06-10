import mongoose, { Schema, Document } from 'mongoose';
import { hashPassword } from '../../middleware/hash-password';
import { GenerateJwtToken } from '../../middleware/jwt';
import { EMAIL_ALL_READY_EXISTS, EMAIL_IS_REQUIRED, PHONE_NUMBER_IS_REQUIRED, VALID_EMAIL_ADDRESS } from '../../utils/messages';
// import { NextFunction } from 'express';

const validateEmail = (email: string) => {
    const re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email);
};

enum Gender{
    Male = 'male',
    Female = 'female', 
    Other = 'other'
}

enum UserType{
    Student = 'student',
    Teacher = 'teacher',
    College = 'college'
}

export interface IUser extends Document {
    name: string;
    gender?: Gender;
    email: string;
    password: string;
    fcmToken?: string;
    phoneNumber?: string;
    verifyPhone: boolean;
    welcome: boolean;
    userType?: UserType;
    accessToken?: string;
    generateToken: () => string;
}

const UserSchema: Schema = new Schema({
    name: { type: String, require: true,
        trim: true},

    email: { 
        type: String,
        trim: true,
        required: [true, EMAIL_IS_REQUIRED],
        unique: true,
        validate: [validateEmail, VALID_EMAIL_ADDRESS],
        index: {
            unique: true
        },
    },
    gender: { type: String, enum: Object.values(Gender)},
    password: {type: String,  required: true,
        trim: true,},
    fcmToken: {type: String},
    phoneNumber: {type: String},
    verifyPhone: {type: Boolean, default: false},
    welcome: {type: Boolean, default: false},
    userType: { type: String, enum: Object.values(UserType) },
    accessToken: {type: String}
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await hashPassword(user.password);
    }
    next();
})

UserSchema.methods.generateToken = async function () {
    const user = this;
    const token = GenerateJwtToken(user._id.toString());
    user.accessToken = token ;
    await user.save();
    return token;
}

// Export the model and return your IUser interface
const User = mongoose.model<IUser>('User', UserSchema);

export default User;