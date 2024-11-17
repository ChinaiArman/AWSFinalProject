// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/dbConfig.js';


// MODEL DEFINITION
const User = db_config.define('User', {
    id: {
        type: DataTypes.STRING,
        primaryKey: true
    },
    role: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    is_verified: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
}, {
    tableName: 'users',
    timestamps: false
});


// DEFAULT EXPORT
export default User;