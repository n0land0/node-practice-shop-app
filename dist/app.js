"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
const express_session_1 = __importDefault(require("express-session"));
const SequelizeStore = require("connect-session-sequelize")(express_session_1.default.Store);
const csurf_1 = __importDefault(require("csurf"));
// import rootDir, { publicDir } from './util/path';
const path_2 = __importDefault(require("./util/path"));
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const error_1 = require("./controllers/error");
// import { db } from './util/database';
const database_1 = require("./util/database");
const Product_1 = __importDefault(require("./models/Product"));
const User_1 = __importDefault(require("./models/User"));
const Cart_1 = __importDefault(require("./models/Cart"));
const CartItem_1 = __importDefault(require("./models/CartItem"));
const Order_1 = __importDefault(require("./models/Order"));
const OrderItem_1 = __importDefault(require("./models/OrderItem"));
const app = (0, express_1.default)();
const store = new SequelizeStore({
    db: database_1.sequelize
});
const csrfProtection = (0, csurf_1.default)();
app.set('view engine', 'ejs');
app.set('views', 'dist/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express_1.default.static(path_1.default.join(path_2.default, '..', 'public')));
app.use((0, express_session_1.default)({
    secret: 'secretsSecretsAreNoFun',
    resave: false,
    saveUninitialized: false,
    store
}));
app.use(csrfProtection);
app.use((request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const retrievedUser = await User.findByPk(1);
        if (request.session.user) {
            const retrievedUser = yield User_1.default.findByPk(request.session.user.id);
            console.log('request.session.user app.ts', request.session.user);
            request.user = retrievedUser;
        }
        next();
    }
    catch (error) {
        console.log(error);
    }
}));
app.use((request, response, next) => {
    response.locals.isAuthenticated = request.session.isLoggedIn;
    response.locals.csrfToken = request.csrfToken();
    next();
});
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(authRoutes_1.default);
app.use(error_1.getPageNotFoundPage);
Product_1.default.belongsTo(User_1.default, {
    constraints: true,
    onDelete: 'CASCADE'
});
User_1.default.hasMany(Product_1.default);
User_1.default.hasOne(Cart_1.default);
User_1.default.hasMany(Order_1.default);
Cart_1.default.belongsTo(User_1.default);
Cart_1.default.belongsToMany(Product_1.default, { through: CartItem_1.default });
Product_1.default.belongsToMany(Cart_1.default, { through: CartItem_1.default });
Order_1.default.belongsTo(User_1.default);
Order_1.default.belongsToMany(Product_1.default, { through: OrderItem_1.default });
const sync = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 0');
        // const result = await sequelize.sync({ force: true }); // force in dev only
        const result = yield database_1.sequelize.sync();
        yield database_1.sequelize.query('SET FOREIGN_KEY_CHECKS = 1');
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
    }
    catch (error) {
        console.log(error);
    }
});
sync();
// app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
