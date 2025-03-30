import { Router } from 'express';

const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res) => {
    res.send({ message: 'GET all subscriptions' });
});

subscriptionRouter.get('/:id', (req, res) => {
    res.send({ message: 'GET subscription details' });
});

subscriptionRouter.post('/', (req, res) => {
    res.send({ message: 'Create a new subscription' });
});

subscriptionRouter.put('/:id', (req, res) => {
    res.send({ message: 'Update the subscription by ID' });
});

subscriptionRouter.delete('/:id', (req, res) => {
    res.send({ message: 'Delete subscription' });
});

subscriptionRouter.get('/user/:id', (req, res) => {
    res.send({ message: 'GET all subscriptions of a user' });
});

subscriptionRouter.put(':id/cancel', (req, res) => {
    res.send({ message: 'Cancel subscription' });
})

subscriptionRouter.get('upcoming', (req, res) => {
    res.send({ message: 'GET all upcoming subscriptions' });
});


export default subscriptionRouter;