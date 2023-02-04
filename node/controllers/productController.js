import ProductModel from "../models/productModel.js"; //Importar el modelo de los productos
import { productsStock, productMinStock } from "../app.js" //Variables de servidor que manejan la cantidad de stock disponible por cada producto
import { sendMail } from "../mail/mailer.js"; //Funcion de correos
import mercadopago from "mercadopago"; //Importar la funcionalidad de mercadopago


//Obtener todos los productos
export const getAllProducts = async (req, res) => {
    //Pedir todos los datos de base de datos y ordenarlos por id ascendentemente
    try {
        const productos = await ProductModel.findAll({
            order: [
                ['id', 'ASC']
            ]
        });
        res.json(productos);
    } catch (error) {
        res.json({ message: error.message })
    }
}

//Obtener un solo producto por id
export const getProduct = async (req, res) => {
    try {
        //Pedir a base de datos los registros que coincidan con el id (solo debe retornar un registro)
        const productos = await ProductModel.findAll({
            where: { id: req.params.id }
        })
        res.json(productos[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Actualizar la informacion de un producto
export const updateProduct = async (req, res) => {
    try {
        //Utilizar el metodo update de sequelize, el cual actualiza los campos que se le suministran en el body a los registros que coincidan con el campo dado en where
        await ProductModel.update(req.body, {
            where: { id: req.params.id }
        });
        productsStock[req.params.id] = req.body.stockCurrent;//Reiniciar el arreglo del servidor para que coincida con el de base de datos
        productMinStock[req.params.id] = req.body.stockMin;//Reiniciar el arreglo del servidor para que coincida con el de base de datos
        res.json('Registro actualizado correctamente')
    } catch (error) {
        res.json({ message: error });
    }
}

//Reservar productos
//Esta funcion recibe un id y un query mediante la url de la peticion
//Retorna Booked, Unbooked o Stockout segun la peticion y el estado de la bodega de productos
export const bookProduct = (req, res) => {
    try {
        if (req.query.f === 'unbook') { // Si el query es unbook entonces devover el producto al arreglo
            productsStock[req.params.id]++;
            return res.json('Unbooked');
        } else if (req.query.f === 'book') {
            if (productsStock[req.params.id] == 0) return res.json('Stockout') // Si ya no quedan productos en reserva, no actualizar el arreglo
            productsStock[req.params.id]--; //Despues de validar, reservar el producto del arreglo de stock
            return res.json('Booked');
        }
        res.status(400).json('Bad request');
    } catch (error) {
        res.json({ message: error.message });
    }
}

//Esta funcion es llamada por cada producto que se necesite actualizar su cantidad despues de comprar
const updateContent = async (product, quantity) => {
    //Obtiene la cantidad de productos en base de datos antes de hacer la compra
    const stock = await ProductModel.findAll({
        attributes: ['id', 'stockCurrent'],
        where: { id: product }
    })
    //Calcula la cantidad de stock que habra despues de restar lo que el usuario compró
    await ProductModel.update({ stockCurrent: stock[0].dataValues.stockCurrent - quantity[product] }, {
        where: { id: product }
    })
    //Si la cantidad nueva es menor que el stock minimo, enviar un correo a la informacion definida
    if (productMinStock[product].stockMin >= stock[0].dataValues.stockCurrent - quantity[product]) {
        sendMail({ id: product, name: productMinStock[product].name });
    }
}


// PARA LA APLICACION DE ANGULAR
// Debido a que angular no utiliza mercadopago, simplemente se borran los datos de la compra de la base de datos
export const buyProductsAux = async (req, res) => {
    Object.keys(req.body).forEach(product => updateContent(product, req.body));
    res.send('Successful');
}

//Comprar productos y realizar la conexion con la api de mercado pago
export const buyProducts = async (req, res) => {
    //Definir las preferencias que exige la api para funcionar correctamente
    let preference = {
        items: [],
        back_urls: {
            success: "http://localhost:3000/feedback",
            failure: "http://localhost:3000/failure",
            pending: "http://localhost:3000/pending"
        },
        auto_return: "approved",
    };
    //Agregar a la lista de items de las preferencias el objeto de carrito de compras
    Object.keys(req.body).forEach(id => {
        preference.items.push({
            title: productMinStock[id].name,
            unit_price: productMinStock[id].price,
            quantity: req.body[id]
        })
    })
    const response = await mercadopago.preferences.create(preference); //Utilizar el metodo create para aplicar las preferencias
    const preferenceId = response.body.id;
    Object.keys(req.body).forEach(product => updateContent(product, req.body));
    res.send({preferenceId});//Retornar al front el id de la compra
}