"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const admin_1 = require("./admin");
router.get('/', (request, response, next) => {
    // response.sendFile(path.join(rootDir, 'views', 'shop.html'));
    response.render('shop', {
        pageTitle: 'Shop',
        path: '/',
        prods: admin_1.products
    });
    console.log('shop.ts', admin_1.products);
    // response.sendFile(path.join(__dirname, '../../public', 'views', 'shop.html'));
    // response.sendFile(path.join(publicDir, 'views', 'shop.html'));
});
exports.default = router;
