// IMPORTS
import express from "express";

// CONSTANTS
const facultyRoutes = express.Router();


// ROUTES

// Get all faculty
facultyRoutes.get('/getAllFaculty', async (req, res) => {
    const db = req.db;
    try {
        const faculty = await db.getAllFaculty();
        res.status(200).json({ "faculty": faculty });
        return;
    } catch(error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// Add new faculty
facultyRoutes.post('/addFaculty', async (req, res) => {
    const db = req.db;
    const { user_id, first_name, last_name, email, phone_number, date_of_birth, is_admin } = req.body;
    try {
        await db.addFaculty(user_id, first_name, last_name, email, phone_number, date_of_birth, is_admin);
        res.status(200).json({ "message": "Faculty added successfully" });
        return;
    } catch(error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})

// EXPORTS
export default facultyRoutes;