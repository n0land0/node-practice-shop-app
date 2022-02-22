import express, { Request, Response, NextFunction } from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
const SequelizeStore = require("connect-session-sequelize")(session.Store);
import { Model } from 'sequelize';
import csrf from 'csurf';

// import rootDir, { publicDir } from './util/path';
import rootDir from './util/path';
import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';
import authRoutes from './routes/authRoutes';
import { getPageNotFoundPage as get404 } from './controllers/error';
// import { db } from './util/database';
import { sequelize } from './util/database';
import Product from './models/Product';
import User from './models/User';
import Cart from './models/Cart';
import CartItem from './models/CartItem';
import Order from './models/Order';
import OrderItem from './models/OrderItem';

const app = express();
const store = new SequelizeStore({
  db: sequelize
});
const csrfProtection = csrf();
app.set('view engine', 'ejs');
app.set('views', 'dist/views');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express.static(path.join(rootDir, '..', 'public')));
app.use(session({
  secret: 'secretsSecretsAreNoFun',
  resave: false,
  saveUninitialized: false,
  store
}));
app.use(csrfProtection);
app.use(async (request: Request, response: Response, next: NextFunction) => {
  try {
    // const retrievedUser = await User.findByPk(1);
    if (request.session.user) {
      const retrievedUser = await User.findByPk(request.session.user.id);
      console.log('request.session.user app.ts', request.session.user);
      request.user = retrievedUser;
    }
    next();
  } catch (error) {
    console.log(error);
  }
});
app.use((request, response, next) => {
  response.locals.isAuthenticated = request.session.isLoggedIn;
  response.locals.csrfToken = request.csrfToken();
  next();
})
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);
app.use(get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: 'CASCADE'
});
User.hasMany(Product);
User.hasOne(Cart);
User.hasMany(Order);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });
Order.belongsTo(User);
Order.belongsToMany(Product, { through: OrderItem });

const sync = async () => {
  try {
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
    // const result = await sequelize.sync({ force: true }); // force in dev only
    const result = await sequelize.sync();
    await sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
    // if (result) {
    //   let user = await User.findByPk(1);
    //   if (!user) {
    //     user = await User.create({
    //       name: 'Nolan',
    //       email: 'nolan@example.com',
    //       password: 'hey'
    //     })
    //   }
    //   const cart = await user.createCart();
    // }
    app.listen(3000);
  } catch (error) {
    console.log(error);
  }
}

sync();

// app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
