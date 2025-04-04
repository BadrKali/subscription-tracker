import { JWT_SECRET } from "../config/env.js";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        let token ;

        if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(!token) {
            throw new Error('Unauthorized');
        }
        const decoded = jwt.verify(token, JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if(!user) {
            throw new Error('Unauthorized');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: 'Unauthorized'
        });
    }
}

export default authorize;