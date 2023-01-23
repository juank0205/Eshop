//import database connection
import db from "../database/db.js";
import { DataTypes } from "sequelize";

const ProductModel = db.define('productos', {
    name: {type: DataTypes.STRING},
    details: {type: DataTypes.STRING},
    price: {type: DataTypes.NUMBER}
});

export default ProductModel;