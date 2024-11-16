// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/dbConfig.js';


// MODEL DEFINITION
const User = db_config.define('User', {
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