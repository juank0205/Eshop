import db from "../database/db.js"
import { DataTypes } from "sequelize"
import ProductModel from "./productModel.js"

const UserModel = db.define('users', {
    username: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING}
})

export default UserModel;