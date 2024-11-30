// IMPORTS
import express from "express";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


// CONSTANTS
const userRoutes = express.Router();


// ROUTES
userRoutes.get('/user/:userId', isSignedIn, async (req, res) => {
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

userRoutes.get('/getUserBySession', isSignedIn, async (req, res) => {
    const db = req.db;
    console.log(`UserID from getUserBySessions route: ${req.session.userId}`)
    try {
        const user = await db.getUserById(req.session.userId);
        res.status(200).json({ "user": user });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});

userRoutes.get('/getAllUsers', isSignedIn, isVerified, isAdmin, async (req, res) => {
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