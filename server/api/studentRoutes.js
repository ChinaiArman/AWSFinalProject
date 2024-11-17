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

studentRoutes.get('/:studentId/enroll/:courseId', async (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const db = req.db;
    try {
        await db.enrollStudent(studentId, courseId);
        res.status(200).json({ "message": "Student enrolled successfully" });
        return;
    } catch(error) {
        res.status(400).json({ "Error enrolling student": error.message });
        return;
    }
})


// EXPORTS
export default studentRoutes;