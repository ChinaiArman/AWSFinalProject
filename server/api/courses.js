import express from 'express';
import { getAllCourses } from '../models/Course.js';
const router = express.Router();


router.get('/courses', async (req, res) => {
    try {
        const courses = await getAllCourses();
        res.json(courses);
    } catch (err) {
        res.status(500).json({ error: 'Database error', message: err.message });
    }
});

export default router;