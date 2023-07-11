import dotenv from "dotenv";

dotenv.config();

export default {
    PORT: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    NODE_ENV: process.env.NODE_ENV,
    DEPLOY_URL: process.env.DEPLOY_URL,
    CLIENT_ID: process.env.CLIENT_ID,
    CLIENT_SECRET: process.env.CLIENT_SECRET,
    CALLBACK_URL: process.env.CALLBACK_URL,
    COOKIE_KEY: process.env.COOKIE_KEY,
    ADMIN_KEY: process.env.ADMIN_KEY,
    USER_KEY: process.env.USER_KEY,
    GMAIL_USER: process.env.GMAIL_USER,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD
}