import nodemailer from 'nodemailer';
import {EMAIL_SENDER, EMAIL_SENDER_PASSWORD} from './env.js';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user:EMAIL_SENDER,
        pass: EMAIL_SENDER_PASSWORD,
    },
})


export default transporter;
