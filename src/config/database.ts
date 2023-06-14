import mongoose from "mongoose";
import { config } from "./config";

const connection = async () =>{
    try {
        console.log(config.mongo.url)
        await mongoose.connect(config.mongo.url), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false
        };
        console.log("database connected")
    } catch (error) {
        console.log(error);
    }
}

export default connection;