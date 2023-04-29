import { dirname } from "path";
import { fileURLToPath } from "url";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import config from "./config/config.js";

//Dirname
export const __dirname = dirname(fileURLToPath(import.meta.url));

//Bcrypt
export const hashPassword = async (password) => {
    return bcrypt.hash(password, 10)
}

export const comparePassword = async (password, passwordBD) => {
    return bcrypt.compare(password, passwordBD);
}

//JWT
export const generateToken = (user) => {
    const token = jwt.sign({user}, "secretJWT", {expiresIn: "1h"});
    return token;
}

//NodeMailer
export const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: config.GMAIL_USER,
        pass: config.GMAIL_PASSWORD
    }
});