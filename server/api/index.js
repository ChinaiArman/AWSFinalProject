// IMPORTS
import express from "express";

import authenticationRoutes from "./authentication.js";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


// CONSTANTS
const router = express.Router();


// ROUTES
router.use('/auth', authenticationRoutes);

// Student Routes
router.get('/student/:studentId/courses', async (req, res) => {
    const studentId = req.params.studentId;
    const courses = await Course.findAll({
       include: [
        {
            model: Enrollment,
            as: 'enrollment',
            where: { student_id: studentId }
        }
       ]
    })
    res.send(courses);
})


// Course Routes - Admin
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