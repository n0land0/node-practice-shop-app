const express = require('express');
const app = express();

const path = require('path');
const bodyParser = require('body-parser');

const rootDir = require('./util/path');
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(rootDir, 'public')));

app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((request, response, next) => {
  response.status(404).sendFile(path.join(rootDir, 'views', 'page-not-found.html'));
});

app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
