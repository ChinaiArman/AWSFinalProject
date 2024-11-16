// IMPORTS
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


// CONSTANTS
const studentRoutes = express.Router();


// ROUTES
studentRoutes.get('/:studentId/courses', async (req, res) => {
    const studentId = req.params.studentId;
    const db = req.db;
    try {
        const courses = await db.getStudentCourses(studentId);
        res.status(200).json({ "courses": courses });
        return;
    } catch(error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})


// EXPORTS
export default studentRoutes;