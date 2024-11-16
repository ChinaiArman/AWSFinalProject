// IMPORTS
import { DataTypes } from "sequelize";
import db from "../services/database.js";


// MODEL DEFINITION
const Faculty = db.define('Faculty', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    first_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    last_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phone_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    tableName: 'faculty',
    timestamps: false
});


// DEFAULT EXPORT
export default Faculty;