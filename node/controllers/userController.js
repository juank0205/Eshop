import { encrypt } from "../encrypt.js";
import UserModel from "../models/userModel.js";

//Funcion utilizada para iniciar sesion
//Recibe un usuario y una contraseña y retorna el registro que coincida con estas caracteristicas en caso de encontrarlo
export const getUser = async (req, res) => {
    try {
        const users = await UserModel.findAll({
            where: {
                username: req.body.username,
                password: encrypt(req.body.password)
            }
        })
        if (users.length != 1) return res.json('Usuario no valido'); //Si encuentra mas de un registro con el mismo nombre de usuario, retornar error
        res.json(users[0]);
    } catch (error) {
        res.json({message: error.message})
    }
}

//Crear Usuario (registrarse)
//Recibe todas las caracteristicas de un usuario y lo introduce en la base de datos
export const createUser = async (req, res) => {
    try {
        await UserModel.create({...req.body, password: encrypt(req.body.password)});
        return res.json('User Created successfully');
    } catch (error) {
        return res.status(400).json("Data not valid");
    }
}

//Actualizar las caracteristicas del administrador
export const updateAdmin = async (req, res) => {
    try {
        await UserModel.update({...req.body, password: encrypt(req.body.password)}, { //Busca el usuario administrador (unico) y actualiza sus sus caracteristicas
            where: {isAdmin: 1}
        });
        res.json('Admin updated')
    } catch (error) {
        res.json({message: error.message})
    }
}