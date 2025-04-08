import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions, cancelSubscription, getAllSubscriptions, getSubscriptionDetails, deleteSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();

subscriptionRouter.get('/', authorize, getAllSubscriptions);

subscriptionRouter.get('/:id', authorize, getSubscriptionDetails);

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.delete('/:id', authorize, deleteSubscription);

subscriptionRouter.get('/user/:id',authorize, getUserSubscriptions);

subscriptionRouter.put(':id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('upcoming', (req, res) => {
    res.send({ message: 'GET all upcoming subscriptions' });
});


export default subscriptionRouter;