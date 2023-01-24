import db from "../database/db.js";
import { DataTypes  } from "sequelize";

const ImageModel = db.define('images', {
    name: {type: DataTypes.STRING},
    idProduct: {type: DataTypes.NUMBER},
    image1: {type: DataTypes.TEXT('long')},
    image2: {type: DataTypes.TEXT('long')},
    image3: {type: DataTypes.TEXT('long')},
});

export default ImageModel;