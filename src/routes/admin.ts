import { Router } from 'express';
// import path from 'path';
// import rootDir, { publicDir } from '../util/path';
import {
  getAddProductPage, postAddProductPage,
  getEditProductPage, postEditProductPage,
  getAdminProductsPage, deleteAdminProductsPage
} from '../controllers/admin';

const router = Router();

router.get('/add-product', getAddProductPage);
router.get('/products', getAdminProductsPage);
router.post('/add-product', postAddProductPage);
router.get('/edit-product/:productId', getEditProductPage);
router.post('/edit-product', postEditProductPage);
router.post('/delete-product/:productId', deleteAdminProductsPage);

export default router;
