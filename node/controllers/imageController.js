import ImageModel from "../models/imageModel.js";// Importar el modelo de las imagenes

//Funcion para obtener las imagenes de la base de datos
//Retorna un objeto donde las llaves son los id de los productos y los valores son un arreglo que incluye todas las imagenes
export const getImage = async (req, res) => {
    try {
        //Esperar la peticion a la base de datos, ordenada ascendentemente por id
        let images = await ImageModel.findAll({
            order:[
                ['idProduct', 'ASC']
            ]
        });
        //Definir el objeto que se va a retornar
        let imageObj = {}
        //Mapear la respuesta de la base de datos para organizar la informacion en el formato previamente descrito
        images.map(image => {
            if (imageObj.hasOwnProperty(image.idProduct)) imageObj[image.idProduct].push(image.image1);
            else imageObj[image.idProduct] = [image.image1];
        });
        res.json(imageObj); //Retornar el objeto organizado en el formato necesario
    } catch (error) {
        res.json( {message: error.message} );
    }
}

//Obtener solamente un arreglo de imagenes de la id especificada en el parametro de la url
export const getImageMain = async (req, res) => {
    try {
        //Pedir a base de datos todas las imagenes en que tengan la llave foranea del id del parametro
        let images = await ImageModel.findAll({
            where: {idProduct: req.params.id}
        })

        //Mapear la respuesta de la base de datos para organizar la informacion en el formato previamente descrito
        let imageObj = {}
        images.map(image => {
            if (imageObj.hasOwnProperty(image.idProduct)) imageObj[image.idProduct].push(image.image1);
            else imageObj[image.idProduct] = [image.image1];
        });
        res.json(imageObj); //Retornar el objeto organizado en el formato necesario
    } catch (error) {
        res.json( {message: error.message} );
    }
}