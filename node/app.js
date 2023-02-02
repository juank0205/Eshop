import express from "express";
import cors from 'cors'
import db from "./database/db.js";
import productRouter from "./routes/routes.js";
import ProductModel from "./models/productModel.js";
import mercadopago from "mercadopago";

const app = express();
const PORT = 8000 || process.env.PORT;

mercadopago.configure({
    access_token: "TEST-5426413695759943-020121-dde2fb69fd04c1dffbcb14fc73984778-1297952377",
});

app.use(cors());
app.use(express.json());
app.use('/products', productRouter);

try {
    db.authenticate();
    console.log('Succesfully connected to DB');
} catch (error) {
    console.log(`Error: ${error}`);
}

app.get('/', (req, res) => {
    res.send('Funciona');
});

app.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`)
})

const products = await ProductModel.findAll({
    attributes: ['id', 'name', 'stockCurrent', 'stockMin', 'price']
})

let productsStock = {}
let productMinStock = {}
products.forEach(product => { productsStock[product.dataValues.id] = product.dataValues.stockCurrent });
products.forEach(product => { productMinStock[product.dataValues.id] = {stockMin: product.dataValues.stockMin, name: product.dataValues.name, price: product.dataValues.price} });



export {productsStock, productMinStock};