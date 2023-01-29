import express from 'express';
import { getImage, getImageMain } from '../controllers/imageController.js';
import { getAllProducts, getProduct, updateProduct } from '../controllers/productController.js';
import { createUser, getUser } from '../controllers/userController.js';
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

//Get product by id
router.get('/:id', getProduct);

//Modify a product
router.put('/:id', updateProduct);

export default router;