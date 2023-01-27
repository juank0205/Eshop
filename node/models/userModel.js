import db from "../database/db.js"
import { DataTypes } from "sequelize"
import ProductModel from "./productModel.js"

const UserModel = db.define('users', {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    phone: {type: DataTypes.NUMBER},
    email: {type: DataTypes.STRING},
    address: {type: DataTypes.TEXT}
})

export default UserModel;