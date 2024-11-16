// IMPORTS
import express from "express";
import Course from "../models/Course.js";
import Enrollment from "../models/Enrollment.js";


// CONSTANTS
const studentRoutes = express.Router();


// ROUTES
studentRoutes.get('/student/:studentId/courses', async (req, res) => {
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


// EXPORTS
export default studentRoutes;