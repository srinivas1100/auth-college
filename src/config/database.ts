import mongoose from "mongoose";
import { DatabaseConnectionError } from "../middleware/error-handler";
require('dotenv').config();

const mongoURL = process.env.MONGO_URL || "";

const connection = async () =>{
    try {
        console.log(mongoURL);
        await mongoose.connect(mongoURL), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        console.log("mongodb database is connected");
    } catch (error) {
        console.log(error);
    }
}

export default connection;