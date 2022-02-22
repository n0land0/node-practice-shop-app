import { Router } from 'express';
// import path from 'path';
// import rootDir, { publicDir } from '../util/path';
import {
  getAddProductPage, postAddProductPage,
  getEditProductPage, postEditProductPage,
  getAdminProductsPage, deleteAdminProductsPage
} from '../controllers/admin';
import { checkAuth } from '../middleware/isAuth';

const router = Router();

router.get('/add-product', checkAuth, getAddProductPage);
router.get('/products', checkAuth, getAdminProductsPage);
router.post('/add-product', checkAuth, postAddProductPage);
router.get('/edit-product/:productId', checkAuth, getEditProductPage);
router.post('/edit-product', checkAuth, postEditProductPage);
router.post('/delete-product/:productId', checkAuth, deleteAdminProductsPage);

export default router;
