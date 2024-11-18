// IMPORTS
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const studentRoutes = express.Router();


// ROUTES
studentRoutes.get('/:studentId/courses', isSignedIn, isVerified, async (req, res) => {
    const studentId = req.params.studentId;
    const db = req.db;
    try {
        const courses = await db.getCoursesByStudentId(studentId);
        res.status(200).json({ "courses": courses });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

studentRoutes.put('/:studentId/enroll/:courseId', isSignedIn, isVerified, async (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const db = req.db;
    try {
        await db.enrollStudent(studentId, courseId);
        res.status(200).json({ "message": "Student enrolled successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "Error enrolling student": error.message });
        return;
    }
})

studentRoutes.delete('/:studentId/drop/:courseId', isSignedIn, isVerified, async (req, res) => {
    const studentId = req.params.studentId;
    const courseId = req.params.courseId;
    const db = req.db;
    try {
        await db.deleteEnrollment(studentId, courseId);
        res.status(200).json({ "message": "Enrollment deleted successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "Error deleting enrollment": error.message });
        return;
    }
})


// EXPORTS
export default studentRoutes;