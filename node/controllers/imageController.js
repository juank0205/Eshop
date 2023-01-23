import ImageModel from "../models/imageModel.js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const dirpath = path.dirname(__filename);

export const getImage = async (req, res) => {
    try {
        let images = await ImageModel.findAll();
        images = images.map( image => image.image1 )
        res.json(images);
    } catch (error) {
        res.json( {message: error.message} );
    }
}

export const getImageFile = async (req, res) => {
    try {
        res.contentType("image/jpeg");
        res.sendFile(path.join(dirpath, req.query.url));
    } catch (error) {
        res.json({message: error.message});
    }
}

export const getImageMain = async (req, res) => {
    try {
        const image = await ImageModel.findAll({
            where: {idProduct: req.params.id}
        })
        res.json(image[0].image1);
    } catch (error) {
        res.json( {message: error.message} );
    }
}