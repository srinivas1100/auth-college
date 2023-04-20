import mongoose, { Schema, Document } from 'mongoose';
import { HashPassword } from '../../middleware/hash-password';
// import { NextFunction } from 'express';

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
    firstName: string;
    lastName?: string;
    gender?: Gender;
    email: string;
    password: string;
    fcmToken?: string;
    phoneNumber?: string;
    verifyPhone: boolean;
    welcome: boolean;
    userType?: UserType
}

const UserSchema: Schema = new Schema({
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true },
    gender: { type: String, enum: Object.values(Gender) },
    password: {type: String},
    fcmToken: {type: String},
    phoneNumber: {type: String},
    verifyPhone: {type: Boolean, default: false},
    welcome: {type: Boolean, default: false},
    userType: { type: String, enum: Object.values(UserType) },
});

UserSchema.pre("save", async function (next) {
    const user = this;
    if (user.isModified("password")) {
        user.password = await HashPassword(user.password);
    }
    next();
})

// Export the model and return your IUser interface
const User = mongoose.model<IUser>('User', UserSchema);

export default User;