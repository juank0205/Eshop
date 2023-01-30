import UserModel from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            where: {
                username: req.body.username,
                password: req.body.password
            }
        })
        if (users.length != 1) return res.json('Usuario no valido');
        res.json(users[0]);
    } catch (error) {
        res.json({message: error.message})
    }
}

export const createUser = async (req, res) => {
    try {
        await UserModel.create(req.body);
        res.json('User Created successfully');
    } catch (error) {
        res.json({message: error.message});
    }
}

export const updateAdmin = async (req, res) => {
    try {
        await UserModel.update(req.body, {
            where: {isAdmin: 1}
        });
        res.json('Admin updated')
    } catch (error) {
        res.json({message: error.message})
    }
}