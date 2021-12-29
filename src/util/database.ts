import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'shop-app',
  password: 'N0l3h0l3!'
});

export const db = pool.promise();
