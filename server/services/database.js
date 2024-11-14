import dotenv from "dotenv";
dotenv.config();

import mysql from 'mysql2';

const connection = mysql.createConnection({
    host: process.env.DB_ENDPOINT,
    user: 'admin',
    password: process.env.DB_PASS,
    database: 'comp4968'
})

connection.connect((err) => {
    if (err) {
      console.error('Database connection failed:', err.stack);
      return;
    }
    console.log('Connected to database.');
});

export default connection;