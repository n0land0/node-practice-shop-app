"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
// import mysql from 'mysql2';
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize('shop-app', 'root', 'N0l3h0l3!', {
    dialect: 'mysql',
    host: 'localhost'
});
//
// const pool = mysql.createPool({
//   host: 'localhost',
//   user: 'root',
//   database: 'shop-app',
//   password: 'N0l3h0l3!'
// });
//
// export const db = pool.promise();
