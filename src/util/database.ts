// import mysql from 'mysql2';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('shop-app', 'root', 'N0l3h0l3!', {
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
