const express = require('express');
const router = express.Router();

const path = require('path');

const rootDir = require('../util/path');

router.get('/', (request, response, next) => {
  response.sendFile(path.join(rootDir, 'views', 'shop.html'));
});

module.exports = router;
