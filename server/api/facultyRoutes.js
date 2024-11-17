// IMPORTS
import express from "express";

// CONSTANTS
const facultyRoutes = express.Router();


// ROUTES
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

// EXPORTS
export default facultyRoutes;