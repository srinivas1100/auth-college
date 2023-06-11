import mongoose from "mongoose";
import { DatabaseConnectionError } from "../middleware/error-handler";
import { Response } from "express";

const mongoURL = process.env.MONGO_URL || "";

const connection = async () =>{
    try {
        await mongoose.connect(mongoURL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
    } catch (error) {
        console.log(error);
    }
}

export default connection;