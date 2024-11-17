// IMPORTS
import express from "express";


// CONSTANTS
const userRoutes = express.Router();


// ROUTES
userRoutes.get('/user/:userId', async (req, res) => {
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

// get user by session
userRoutes.get('/getUserBySession', async (req, res) => {
    const db = req.db;
    try {
        const user = await db.getUserById(req.session.userId);
        res.status(200).json({ "user": user });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});

userRoutes.get('/getAllUsers', async (req, res) => {
    const db = req.db;
    try {
        const users = await db.getAllUsers();
        res.status(200).json({ "users": users });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
})


// EXPORTS
export default userRoutes;