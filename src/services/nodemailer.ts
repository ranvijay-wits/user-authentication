const nodemailer = require("nodemailer");
import dotenv from "dotenv";
dotenv.config();


const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_EMAIL_PASSWORD
    }
});


export { transporter };