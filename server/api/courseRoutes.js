// IMPORTS
import express from "express";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const courseRoutes = express.Router();


// ROUTES
courseRoutes.get('/getAllCourses', isSignedIn, isVerified, async (req, res) => {
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
courseRoutes.post('/createCourse', isSignedIn, isVerified, isAdmin, async (req, res) => {
    const db = req.db;
    const { faculty_id, course_name, course_description, room_number, seats_available, total_seats } = req.body;
    try {
        const courseId = await db.createCourse(faculty_id, course_name, course_description, room_number, seats_available, total_seats);
        res.status(200).json({ "message": "Course created successfully", courseId });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// Delete course by ID
courseRoutes.delete('/deleteCourse/:courseId', isSignedIn, isVerified, isAdmin, async (req, res) => {
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

courseRoutes.put('/createCourseRuntime/:courseId', isSignedIn, isVerified, isAdmin, async (req, res) => {
    const courseId = req.params.courseId;
    const db = req.db;
    const { start_date, end_date, start_time, end_time, day_of_week, location } = req.body;
    try {
        await db.createCourseRuntime(courseId, start_date, end_date, start_time, end_time, day_of_week, location);
        res.status(200).json({ "message": "Course runtime created successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});

// Get course details including runtimes (for editing)
courseRoutes.get("/:courseId", isSignedIn, isVerified, isAdmin, async (req, res) => {
    const { courseId } = req.params;
    const db = req.db;
  
    try {
      const course = await db.getCourseById(courseId);
      if (!course) {
        return res.status(404).json({ error: "Course not found" });
      }
  
      const runtimes = await db.getCourseRuntimesByCourseId(courseId);
  
      res.status(200).json({ course, runtimes });
    } catch (error) {
      console.error("Error fetching course details:", error);
      res.status(500).json({ error: "Failed to fetch course details" });
    }
  });


// EXPORTS
export default courseRoutes;