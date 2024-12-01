// IMPORTS
import { Sequelize } from 'sequelize';
// import dotenv from "dotenv";


// ENVIRONMENT VARIABLES
// if (process.env.NODE_ENV !== "production") {
//     dotenv.config();
// }


// SEQUELIZE CONNECTION
const dbConfig = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: 'mysql',
        logging: false,
    }
);



// EXPORT
export default dbConfig;