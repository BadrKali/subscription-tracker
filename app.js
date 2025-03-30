import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDB from './database/mongodb.js';

const app = express();

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);


app.listen(PORT, async () => {
    console.log(`Subscription tracker is running on port ${PORT}`);
    await connectToDB();
});

export default app;