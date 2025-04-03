import { Router } from 'express';
import { getUsers, getUser, createUser, updateUser } from '../controllers/user.controller.js';
import authorize from '../middlewares/auth.middleware.js';

const userRouter = Router();

userRouter.get('/', getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', createUser);

userRouter.put('/:id', updateUser);

userRouter.delete('/:id', (req, res) => {
    res.send({ message: 'Delete user' });
});

export default userRouter;