import express from "express"; //Exoress
import cors from 'cors' //Cors permite hacer peticiones a dominios externos
import db from "./database/db.js"; //Importar la base de datos
import productRouter from "./routes/routes.js"; //Rutas del producto
import ProductModel from "./models/productModel.js"; //Modelo del producto
import mercadopago from "mercadopago"; // Objeto de mercadopago

const app = express();
const PORT = 8000 || process.env.PORT; //Inicializar el servidor en el puerto 8000 o en el que designe el servicio de hosting

mercadopago.configure({
    access_token: "TEST-5426413695759943-020121-dde2fb69fd04c1dffbcb14fc73984778-1297952377", //Access token de mercado pago
});

//Configuracion del servidor express
app.use(cors());
app.use(express.json());
app.use('/products', productRouter);

//Conexion a la base de datos
try {
const PORT = 8000 || process.env.PORT; //I
    db.authenticate();
    console.log('Succesfully connected to DB');
} catch (error) {
    console.log(`Error: ${error}`);
}

//Ruta base para probar conexion
app.get('/', (req, res) => {
    res.send('Funciona');
});

//Empezar a escuchar en el puerto designado
app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})

//Obtener datos de la base de datos para iniciar los objetos encargados de reservar productso para los usuarios
const products = await ProductModel.findAll({
    attributes: ['id', 'name', 'stockCurrent', 'stockMin', 'price']
})

//Definir los objetos en los formatos destinados
let productsStock = {}
let productMinStock = {}
products.forEach(product => { productsStock[product.dataValues.id] = product.dataValues.stockCurrent });
products.forEach(product => { productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, name: product.dataValues.name, price: product.dataValues.price} });



export {productsStock, productMinStock};