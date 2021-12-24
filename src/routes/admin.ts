import { Router } from 'express';
// import path from 'path';
// import rootDir, { publicDir } from '../util/path';
import { getAddProductPage, postAddProductPage } from '../controllers/products';

const router = Router();

router.get('/add-product', getAddProductPage);
router.post('/add-product', postAddProductPage);

export default router;
