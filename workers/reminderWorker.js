import nodemailer from "nodemailer"
import { Worker } from "bullmq"
import redisConnection from "../config/redisClient.js"
import User from "../models/user.model.js"
import {EMAIL_SENDER, EMAIL_SENDER_PASSWORD} from "../config/env.js"
import { sendRemiderEmail } from "../utils/send-email.js"
import Subscription from "../models/subscription.model.js"


const reminderWorkder = new Worker (
    "reminderQueue",
    async (job) => {
        const { userId, subscriptionId, daysBefore } = job.data;
        const subscription = await Subscription.findById(subscriptionId)
        const user = await User.findById(userId)
        if(!user) {
            console.error(`User ${userId} not found`)
            return;
        }
        console.log(`Sending email reminder to ${user.email} (${daysBefore} days before renewal)`);
        await sendRemiderEmail(
            user.email,
            user.name,
            subscription
        )
    },
    { connection: redisConnection }
);


