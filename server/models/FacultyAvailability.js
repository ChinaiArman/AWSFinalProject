// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/db_config.js';


// MODEL DEFINITION
const FacultyAvailability = db_config.define('FacultyAvailability', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    faculty_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    day: {
        type: DataTypes.STRING,
        allowNull: false
    },
    start_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    end_time: {
        type: DataTypes.TIME,
        allowNull: false
    },
    available: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
}, {
    tableName: 'faculty_availabilities',
    timestamps: false
});


// DEFAULT EXPORT
export default FacultyAvailability;