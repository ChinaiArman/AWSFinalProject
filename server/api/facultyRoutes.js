// IMPORTS
import express from "express";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const facultyRoutes = express.Router();


// ROUTES
facultyRoutes.get('/getAllFaculty', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const db = req.db;
    try {
        const faculty = await db.getAllFaculty();
        res.status(200).json({ "faculty": faculty });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

facultyRoutes.post('/addFaculty', isSignedIn, isVerified, isAdmin, async (req, res) => {
    const db = req.db;
    const { user_id, first_name, last_name, email, phone_number, date_of_birth, is_admin } = req.body;
    try {
        await db.addFaculty(user_id, first_name, last_name, email, phone_number, date_of_birth, is_admin);
        res.status(200).json({ "message": "Faculty added successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

facultyRoutes.delete('/deleteFaculty/:facultyId', isSignedIn, isVerified, isAdmin, async (req, res) => {
    const facultyId = req.params.facultyId;
    const db = req.db;
    try {
        await db.deleteFaculty(facultyId);
        res.status(200).json({ "message": "Faculty deleted successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

facultyRoutes.get('/getFaculty/:facultyId', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const facultyId = req.params.facultyId;
    const db = req.db;
    try {
        const faculty = await db.getFacultyById(facultyId);
        res.status(200).json({ "faculty": faculty });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

facultyRoutes.get('/:facultyId/courses', isSignedIn, isVerified, isFaculty, async (req, res) => {
    const facultyId = req.params.facultyId;
    const db = req.db;
    try {
        const courses = await db.getCoursesByFacultyId(facultyId);
        res.status(200).json({ "courses": courses });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})


// EXPORTS
export default facultyRoutes;