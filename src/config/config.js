import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    COOKIE_KEY: process.env.COOKIE_KEY
}