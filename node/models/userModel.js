import db from "../database/db.js"
import { DataTypes } from "sequelize"

//Definir los campos de la tabla de usuarios
const UserModel = db.define('users', {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.NUMBER},
    email: {type: DataTypes.STRING},
    isAdmin: {type: DataTypes.BOOLEAN},
    address: {type: DataTypes.TEXT}
})

export default UserModel;