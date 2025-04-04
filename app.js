import express from 'express';
import { PORT } from './config/env.js';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import subscriptionRouter from './routes/subscription.route.js';
import connectToDB from './database/mongodb.js';
import errorMiddleware from './middlewares/error.middleware.js';
import rateLimiter from './middlewares/ratelimit.middleware.js';
import cookieParser from 'cookie-parser';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimiter);

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/subscriptions', subscriptionRouter);

app.use(errorMiddleware);


app.listen(PORT, async () => {
    console.log(`Subscription tracker is running on port ${PORT}`);
    await connectToDB();
});

export default app;