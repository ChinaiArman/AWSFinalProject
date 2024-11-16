// IMPORTS
import { DataTypes } from "sequelize";
import db from "../services/database.js";


// MODEL DEFINITION
const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false
});


// DEFAULT EXPORT
export default User;