import ImageModel from "../models/imageModel.js";


export const getImage = async (req, res) => {
    try {
        let images = await ImageModel.findAll({
            order:[
                ['idProduct', 'ASC']
            ]
        });
        let imageObj = {}
        images.map(image => {
            if (imageObj.hasOwnProperty(image.idProduct)) imageObj[image.idProduct].push(image.image1);
            else imageObj[image.idProduct] = [image.image1];
        });
        res.json(imageObj);
    } catch (error) {
        res.json( {message: error.message} );
    }
}

export const getImageMain = async (req, res) => {
    try {
        let images = await ImageModel.findAll({
            where: {idProduct: req.params.id}
        })
        let imageObj = {}
        images.map(image => {
            if (imageObj.hasOwnProperty(image.idProduct)) imageObj[image.idProduct].push(image.image1);
            else imageObj[image.idProduct] = [image.image1];
        });
        res.json(imageObj);
    } catch (error) {
        res.json( {message: error.message} );
    }
}