import express from 'express';
import { getImage, getImageMain } from '../controllers/imageController.js';
import { getAllProducts, getProduct } from '../controllers/productController.js';
import { createUser, getUser } from '../controllers/userController.js';
const router = express.Router();

router.get('/', getAllProducts);
router.get('/image', getImage);
router.get('/image/:id', getImageMain);
router.post('/login', getUser);
router.post('/signup', createUser);
router.get('/:id', getProduct);

export default router;