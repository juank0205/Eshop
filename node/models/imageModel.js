import db from "../database/db.js";
import { DataTypes  } from "sequelize";

const ImageModel = db.define('images', {
    idProduct: {type: DataTypes.NUMBER},
    image1: {type: DataTypes.TEXT('long')},
});

export default ImageModel;