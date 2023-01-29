import ProductModel from "../models/productModel.js";

export const getAllProducts = async (req, res) => {
    try{
        const productos = await ProductModel.findAll({
            order:[
                ['id', 'ASC']
            ]
        });
        res.json(productos);
    } catch (error){
        res.json( {message: error.message} )
    }
}

export const getProduct = async (req, res) => {
    try{
        const productos = await ProductModel.findAll({
            where:{ id: req.params.id }
        })
        res.json(productos[0]);
    } catch (error) {
        res.json( {message: error.message} );
    }
}

export const updateProduct = async (req, res) => {
    try {
        await ProductModel.update(req.body, {
            where: {id: req.params.id}
        });
        res.json('Registro actualizado correctamente')
    } catch (error) {
        res.json( {message: error });
    }
}