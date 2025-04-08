import {subscriptionReminderEmailTemplate} from './email-template.js';
import { EMAIL_SENDER } from '../config/env.js';
import transporter from '../config/nodemailer.js';

export const sendRemiderEmail = async (userEmail, userName, subscription) => {
    try {
        if(!userEmail || !userName || !subscription) {
            throw new Error('Missing required fields');
        }
        const { name, renewalDate } = subscription;
        const subject = `Subscription Reminder: ${name} Renewal`;
        const html = subscriptionReminderEmailTemplate({ userName, name, renewalDate });


        const mailOptions = {
            from: EMAIL_SENDER,
            to: userEmail,
            subject,
            html,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if(error){
                console.error("Error sending email:", error);
            }
            console.log("Email sent:", info.response);
        });

    } catch (error) {
        console.error("Error in sendRemiderEmail:", error);
        throw error;
    }
}