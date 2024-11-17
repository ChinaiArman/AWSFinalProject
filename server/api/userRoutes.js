// IMPORTS
import express from "express";
import User from "../models/User.js";



// CONSTANTS
const userRoutes = express.Router();


// ROUTES
userRoutes.put('/verify', async (req, res) => {
    const db = req.db;
    const { userId } = req.body;
    try {
        await db.verifyUser(userId);
        res.status(200).json({ "message": "User verified successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});


// EXPORTS
export default userRoutes;