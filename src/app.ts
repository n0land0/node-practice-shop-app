// const express = require('express');
import express from 'express';
// const path = require('path');
// const bodyParser = require('body-parser');
import path from 'path';
import bodyParser from 'body-parser';
const handlebars = require('express-handlebars');
// const rootDir = require('./util/path');
// const adminRoutes = require('./routes/admin');
// const shopRoutes = require('./routes/shop');
import rootDir, { publicDir } from './util/path';
// import adminRoutes from './routes/admin';
import adminRoutes, { products as adminDataProducts } from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();
// app.engine('handlebars', handlebars);
// app.set('view engine', 'handlebars');
app.set('view engine', 'pug');
app.set('views', 'dist/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express.static(path.join(rootDir, '..', 'public')));
// app.use('/admin', adminRoutes);
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((request, response, next) => {
  // response.status(404).sendFile(path.join(publicDir, 'views', 'page-not-found.html'));
  // response.status(404).sendFile(path.join(__dirname, '..', 'public', 'views', 'page-not-found.html'));
  // response.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
  response.status(404).render('page-not-found', {
    pageTitle: 'Page Not Found'
  });
});

app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
