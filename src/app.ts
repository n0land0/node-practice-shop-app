import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';

// import rootDir, { publicDir } from './util/path';
import rootDir from './util/path';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import { getPageNotFoundPage as get404 } from './controllers/error';

const app = express();
app.set('view engine', 'pug');
app.set('views', 'dist/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express.static(path.join(rootDir, '..', 'public')));
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(get404);

app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
