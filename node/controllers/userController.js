import { encrypt } from "../encrypt.js";
import UserModel from "../models/userModel.js";

export const getUser = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            where: {
                username: req.body.username,
                password: encrypt(req.body.password)
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
        console.log({...req.body, password: encrypt(req.body.password)})
        await UserModel.create({...req.body, password: encrypt(req.body.password)});
        return res.json('User Created successfully');
    } catch (error) {
        return res.status(400).json("Data not valid");
    }
}

export const updateAdmin = async (req, res) => {
    try {
        await UserModel.update({...req.body, password: encrypt(req.body.password)}, {
            where: {isAdmin: 1}
        });
        res.json('Admin updated')
    } catch (error) {
        res.json({message: error.message})
    }
}