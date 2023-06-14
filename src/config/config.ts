import dotenv from 'dotenv';

dotenv.config();

const MONGO_USERNAME = process.env.MONGO_USERNAME || "srinu";
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "Srinu2000$";
const MONGO_DATABASE = process.env.MONGO_DATABASE || "auth";
// const MONGO_URL = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@college.olkeyyt.mongodb.net/${MONGO_DATABASE}`;
const MONGO_URL =  process.env.MONGO_URL || "";

const SERVER_PORT = process.env.SERVER_PORT ? Number(process.env.SERVER_PORT) : 3000;

export const config = {
    mongo: {
        url: MONGO_URL
    },
    server: {
        port: SERVER_PORT
    }
}