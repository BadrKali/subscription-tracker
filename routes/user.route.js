import { Router } from 'express';


const userRouter = Router();

userRouter.get('/', (req, res) => {
    res.send({ message: 'GET all user' });
});

userRouter.get('/:id', (req, res) => {
    res.send({ message: 'GET user details' });
});

userRouter.post('/', (req, res) => {
    res.send({ message: 'Create a new User' });
});

userRouter.put('/:id', (req, res) => {
    res.send({ message: 'Update the user by ID' });
});

userRouter.delete('/:id', (req, res) => {
    res.send({ message: 'Delete user' });
});

export default userRouter;