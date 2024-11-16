// IMPORTS
import express from "express";

import authenticationRoutes from "./authentication.js";
import Course from "../models/Course.js";


// CONSTANTS
const router = express.Router();


// ROUTES
router.use('/auth', authenticationRoutes);

// Course Routes
router.get('/getAllCourses', async (req, res) => {
    let courses = await Course.findAll()
    res.send(courses);
})

router.post('/createCourse', async (req, res) => {
    let course = await Course.create(req.body);
    res.send(course);
})

// EXPORTS
export default router;