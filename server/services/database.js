// IMPORTS
import { Sequelize } from 'sequelize';
import dotenv from "dotenv";


// DOTENV CONFIG
dotenv.config();


// SEQUELIZE CONNECTION
const db = new Sequelize(
	process.env.DB_NAME,
	process.env.DB_USER,
	process.env.DB_PASS,
	{
		host: process.env.DB_ENDPOINT,
		dialect: 'mysql',
		logging: false
	}
);
console.log(`Database connection established with ${process.env.DB_NAME} at ${process.env.DB_ENDPOINT}`);


// DEFAULT EXPORT
export default db;