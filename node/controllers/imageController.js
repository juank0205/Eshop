import ImageModel from "../models/imageModel.js";


export const getImage = async (req, res) => {
    try {
        let images = await ImageModel.findAll({
            order:[
                ['idProduct', 'ASC']
            ]
        });
        images = images.map( image => image.image1 )
        res.json(images);
    } catch (error) {
        res.json( {message: error.message} );
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