import db from "../database/db.js";
import { DataTypes  } from "sequelize";

//Definir los campos de la base de datos de imagenes
const ImageModel = db.define('images', { 
    idProduct: {type: DataTypes.NUMBER},
    image1: {type: DataTypes.TEXT('long')},
});

export default ImageModel;