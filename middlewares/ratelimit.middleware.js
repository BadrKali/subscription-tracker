import User from "../models/user.model.js";


const rateLimiters = {};
const RATE_LIMIT_WINDOW = 60 * 1000;
const MAX_REQUESTS = 100;

const rateLimiter = (req, res, next) => {
    const ip = req.ip;
    const currentTime = Date.now();
    if(!rateLimiters[ip]) {
        rateLimiters[ip] = {
            requests: 0,
            firstRequestTime: currentTime
        };
    } else {
        const timeElapsed = currentTime - rateLimiters[ip].firstRequestTime
        if(timeElapsed < RATE_LIMIT_WINDOW) {
            rateLimiters[ip].requests++;
            if(rateLimiters[ip].requests > MAX_REQUESTS) {
                return res.status(429).json({ message: "Too many requests. Please try again later." });
            }
        } else {
            rateLimiters[ip].requests = 1;
            rateLimiters[ip].firstRequestTime = currentTime;
        }
    }
    next();
}

export default rateLimiter;