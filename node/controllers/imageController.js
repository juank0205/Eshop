import ImageModel from "../models/imageModel.js";

export const getImage = async (req, res) => {
    try {
        const image = await ImageModel.findAll({
            where: {idImagen: req.params.id}
        })
        res.json(image[0]);
    } catch (error) {
        res.json( {message: error.message} );
    }
}