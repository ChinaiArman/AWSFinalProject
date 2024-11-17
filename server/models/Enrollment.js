// IMPORTS
import { DataTypes } from "sequelize";
import db_config from '../config/dbConfig.js';


// MODEL DEFINITION
const Enrollment = db_config.define('Enrollment', {
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
    enrollment_date: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
    },
    status: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'enrollments',
    timestamps: false,
});


// DEFAULT EXPORT
export default Enrollment;