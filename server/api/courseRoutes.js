// IMPORTS
import express from "express";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const courseRoutes = express.Router();


// ROUTES
courseRoutes.get('/getAllCourses', async (req, res) => {
    const db = req.db;
    try {
        const courses = await db.getAllCourses();
        res.status(200).json({ "courses": courses });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// Create new course
courseRoutes.post('/createCourse', async (req, res) => {
    const db = req.db;
    const { faculty_id, course_name, course_description, room_number, seats_available, total_seats } = req.body;
    try {
        await db.createCourse(faculty_id, course_name, course_description, room_number, seats_available, total_seats);
        res.status(200).json({ "message": "Course created successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// Delete course by ID
courseRoutes.delete('/deleteCourse/:courseId', async (req, res) => {
    const courseId = req.params.courseId;
    const db = req.db;
    try {
        await db.deleteCourse(courseId);
        res.status(200).json({ "message": "Course deleted successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// EXPORTS
export default courseRoutes;