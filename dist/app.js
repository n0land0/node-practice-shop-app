"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const body_parser_1 = __importDefault(require("body-parser"));
// import rootDir, { publicDir } from './util/path';
const path_2 = __importDefault(require("./util/path"));
const admin_1 = __importDefault(require("./routes/admin"));
const shop_1 = __importDefault(require("./routes/shop"));
const error_1 = require("./controllers/error");
const app = (0, express_1.default)();
app.set('view engine', 'pug');
app.set('views', 'dist/views');
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, publicDir)));
app.use(express_1.default.static(path_1.default.join(path_2.default, '..', 'public')));
app.use('/admin', admin_1.default);
app.use(shop_1.default);
app.use(error_1.getPageNotFoundPage);
app.listen(3000); // internally runs `http.createServer` and passes itself as an argument
