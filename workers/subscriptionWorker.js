import { Worker, Queue } from "bullmq";
import redisConnection from "../config/redisClient.js";
import Subscription from "../models/subscription.model.js";

const reminderQueue = new Queue("reminderQueue", {
  connection: redisConnection,
});

const subscriptionWorker = new Worker(
  "subscriptionQueue",
  async (job) => {
    try {
      const { userId, subscriptionId, renewalDate } = job.data;
      const subscription = await Subscription.findById(subscriptionId);
      if (!subscription) {
        console.error(`subscription ${subscriptionId} not found`);
        return;
      }
      if (!subscription.status) {
        console.log(`subscription ${subscriptionId} is inactive`);
        return;
      }

      const renewal = new Date(renewalDate);
      const now = new Date();
  
      if (renewal < now) {
        console.log(`Renewal date for ${subscriptionId} has already passed`);
        return;
      }

      const reminders = [7, 5, 3];

      for (const daysBefore of reminders) {
          const reminderDate = new Date(renewal);
          reminderDate.setDate(reminderDate.getDate() - daysBefore);
  
          if(reminderDate > now) {
              await reminderQueue.add(
                  "sendReminder",
                  { userId, subscriptionId, daysBefore },
                  { delay: reminderDate.getTime() - now.getTime() }
              )
              console.log(`Reminder for ${daysBefore} days before renewal scheduled.`);
          }
      }
    } catch (error) {
      console.error(`Error processing job ${job.id}: ${error.message}`);
    }
  },
  {
    connection: redisConnection,
  }
);

console.log("Subscription Worker started...");