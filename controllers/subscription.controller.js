import Subscription from '../models/subscription.model.js';
import { Queue } from 'bullmq';
import redisConnection from '../config/redisClient.js';


const subscriptionQueue = new Queue("subscriptionQueue", {
    connection: redisConnection
});

export const createSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.create({...req.body, user: req.user._id});
        await subscriptionQueue.add('createSubscription', {
            userId: req.user._id,
            subscriptionId: subscription._id,
            renewalDate: subscription.renewalDate,
        });



        res.status(201).json({
            success: true,
            data: subscription
        });
    } catch (error) {
        next(error)
    }
}


export const getUserSubscriptions = async (req, res, next) => {
    try {
        if(req.user.id !== req.params.id) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        const subscriptions = await Subscription.find({user: req.params.id});
        res.status(200).json({
            success: true,
            data: subscriptions
        });
    } catch (error) {
        next(error)
    }
}

export const cancelSubscription = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if(!subscription) {
            const error = new Error('Subscription not found');
            error.statusCode = 404;
            throw error;
        }
        if(subscription.user.toString() !== req.user.id) {
            const error = new Error('Unauthorized');
            error.statusCode = 401;
            throw error;
        }
        subscription.status = 'cancelled';
        await subscription.save();
        res.status(200).json({
            success: true,
            data: subscription
        });

    } catch (error) {
        next(error)
    }
}