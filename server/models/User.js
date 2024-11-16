// IMPORTS
import { DataTypes } from "sequelize";
import db from '../config/db_config.js';


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
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false
});


// DEFAULT EXPORT
export default User;