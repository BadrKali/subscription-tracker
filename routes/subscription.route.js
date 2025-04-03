import { Router } from 'express';
import authorize from '../middlewares/auth.middleware.js';
import { createSubscription, getUserSubscriptions, cancelSubscription } from '../controllers/subscription.controller.js';

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
    res.send({ message: 'GET all subscriptions' });
});

subscriptionRouter.get('/:id', authorize,(req, res) => {
    res.send({ message: 'GET subscription details' });
});

subscriptionRouter.post('/', authorize, createSubscription);

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ message: 'Update the subscription by ID' });
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ message: 'Delete subscription' });
});

subscriptionRouter.get('/user/:id',authorize, getUserSubscriptions);

subscriptionRouter.put(':id/cancel', authorize, cancelSubscription);

subscriptionRouter.get('upcoming', (req, res) => {
    res.send({ message: 'GET all upcoming subscriptions' });
});


export default subscriptionRouter;