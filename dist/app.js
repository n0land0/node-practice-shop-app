"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const express = require('express');
const express_1 = __importDefault(require("express"));
// const path = require('path');
// const bodyParser = require('body-parser');
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const handlebars = require('express-handlebars');
// const rootDir = require('./util/path');
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
const path_2 = __importDefault(require("./util/path"));
// import adminRoutes from './routes/admin';
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const app = (0, express_1.default)();
// app.engine('handlebars', handlebars);
// app.set('view engine', 'handlebars');
app.set('view engine', 'pug');
app.set('views', 'dist/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express_1.default.static(path_1.default.join(path_2.default, '..', 'public')));
// app.use('/admin', adminRoutes);
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use((request, response, next) => {
    // response.status(404).sendFile(path.join(publicDir, 'views', 'page-not-found.html'));
    // response.status(404).sendFile(path.join(__dirname, '..', 'public', 'views', 'page-not-found.html'));
    // response.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
    response.status(404).render('page-not-found', {
        pageTitle: 'Page Not Found'
    });
});
app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
