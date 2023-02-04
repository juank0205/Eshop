import express from 'express';
import { getImage, getImageMain } from '../controllers/imageController.js';
import { bookProduct, buyProducts, buyProductsAux, getAllProducts, getProduct, updateProduct } from '../controllers/productController.js';
import { createUser, getUser, updateAdmin } from '../controllers/userController.js';
import { pay } from '../pay.js';
const router = express.Router();

//Get all products sorted by id
router.get('/', getAllProducts);

//Get all images sorted by productId
router.get('/image', getImage);

//Get images by productId
router.get('/image/:id', getImageMain);

//Validate and create users
router.post('/login', getUser);
router.post('/signup', createUser);
router.put('/admin', updateAdmin);

//Book a product in server storage
router.get('/book/:id', bookProduct);

//Buy booked objects
router.post('/buy', buyProducts);
//Buy booked objects (no Mercado Pago)
router.post('/buyAux', buyProductsAux);

//Get product by id
router.get('/:id', getProduct);

//Modify a product
router.put('/:id', updateProduct);

//Payment method stripe
router.post('/pay', pay);

export default router;