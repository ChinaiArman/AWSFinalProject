// IMPORTS
import express from "express";


// CONSTANTS
const userRoutes = express.Router();


// ROUTES
//get user by id
userRoutes.get('/:userId', async (req, res) => {
    const userId = req.params.userId;
    const db = req.db;
    try {
        const user = await db.getUserById(userId);
        res.status(200).json({ "user": user });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})


// EXPORTS
export default userRoutes;