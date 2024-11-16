// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/dbConfig.js';


// MODEL DEFINITION
const Student = db_config.define('Student', {
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
    date_of_birth: {
        type: DataTypes.DATE,
        allowNull: false
    },
}, {
    tableName: 'students',
    timestamps: false
});


// DEFAULT EXPORT
export default Student;