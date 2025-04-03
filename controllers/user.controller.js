import User from "../models/user.model.js";


export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json({
            success: true,
            data: users
        });
    } catch (error) {
        next(error)
    }
}


export const getUser = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');
        if(!user) {
            return res.status(404).json({
                success: false,
                message: 'User not found'
            });
        }
        res.status(200).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error)
    }

}


export const createUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const newUser = await User.create({name, email, password});
        res.status(201).json({
            success: true,
            data: newUser
        });
    } catch (error) {
        next(error)
    }
}

export const updateUser = async (req, res) => {
    try {

    } catch(error) {
        next(error)
    }
}

export const deleteUser = async (req, res) => {
    try {
        
    } catch(error) {
        next(error)
    }
}