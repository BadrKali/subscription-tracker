import nodemailer from "nodemailer"
import { Worker } from "bullmq"
import redisConnection from "../config/redisClient.js"
import User from "../models/user.model.js"
import {EMAIL_SENDER, EMAIL_SENDER_PASSWORD} from "../config/env.js"


const reminderWorkder = new Worker (
    "reminderQueue",
    async (job) => {
        const { userId, subscriptionId, daysBefore } = job.data;
        const user = await User.findById(userId)
        if(!user) {
            console.error(`User ${userId} not found`)
            return;
        }
        console.log(`Sending email reminder to ${user.email} (${daysBefore} days before renewal)`);
        await sendEmail(user.email, `Your subscription renews in ${daysBefore} days!`);
    },
    { connection: redisConnection }
);

async function sendEmail(to, message) {
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: { user: EMAIL_SENDER, pass: EMAIL_SENDER_PASSWORD },
    });
    await transporter.sendMail({
        from: EMAIL_SENDER,
        to,
        subject: "Subscription Reminder",
        text: message,
    });
    console.log(`Email sent to ${to}`);
}


