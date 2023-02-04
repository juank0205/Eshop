//import database connection
import db from "../database/db.js";
import { DataTypes } from "sequelize";

//Definir los campos de la base de datos del producto
const ProductModel = db.define('productos', {
    name: {type: DataTypes.STRING},
    details: {type: DataTypes.STRING},
    price: {type: DataTypes.NUMBER},
    stockMin: {type: DataTypes.NUMBER},
    stockMax: {type: DataTypes.NUMBER},
    stockCurrent: {type: DataTypes.NUMBER}
});

export default ProductModel;