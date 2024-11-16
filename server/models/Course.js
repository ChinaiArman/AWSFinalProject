// IMPORTS
import { DataTypes } from "sequelize";
import db from "../services/database.js";


// MODEL DEFINITION
const Course = db.define('Course', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    instructor_id: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    course_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    course_description: {
        type: DataTypes.STRING,
        allowNull: false
    },
    room_number: {
        type: DataTypes.STRING,
        allowNull: false
    },
    seats_available: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    total_seats: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'courses',
    timestamps: false
});


// DEFAULT EXPORT
export default Course;