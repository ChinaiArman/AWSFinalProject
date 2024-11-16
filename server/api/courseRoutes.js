// IMPORTS
import express from "express";
import Course from "../models/Course.js";


// CONSTANTS
const courseRoutes = express.Router();


// ROUTES
courseRoutes.get('/getAllCourses', async (req, res) => {
    let courses = await Course.findAll()
    res.send(courses);
})

courseRoutes.post('/createCourse', async (req, res) => {
    let course = await Course.create(req.body);
    res.send(course);
})


// EXPORTS
export default courseRoutes;