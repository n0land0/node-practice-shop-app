import { Router } from 'express';
// import path from 'path';

import { getProductsPage } from '../controllers/products';

const router = Router();

router.get('/', getProductsPage);

export default router;
