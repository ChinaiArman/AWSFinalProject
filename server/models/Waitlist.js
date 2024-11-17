// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/dbConfig.js';


// MODEL DEFINITION
const Waitlist = db_config.define('Waitlist', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    course_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    student_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    waitlist_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
}, {
    tableName: 'waitlist',
    timestamps: false,
});


// DEFAULT EXPORT
export default Waitlist;