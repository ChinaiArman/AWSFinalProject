// IMPORTS
import express from "express";

import { isSignedIn, isVerified, isStudent, isFaculty, isAdmin } from "../config/authConfig.js";


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

// For better error handling:

// userRoutes.get('/getUserBySession', async (req, res) => {
//     const db = req.db;
//     try {
//         if (!req.session.userId) {
//             return res.status(401).json({ error: "No active session." });
//         }

//         const user = await db.getUserById(req.session.userId);
//         if (!user) {
//             return res.status(404).json({ error: "User not found." });
//         }

//         res.status(200).json({ user });
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// });

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