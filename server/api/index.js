// IMPORTS
import express from "express";

import authenticationRoutes from "./authenticationRoutes.js";
import courseRoutes from "./courseRoutes.js";
import userRoutes from "./userRoutes.js";
import studentRoutes from "./studentRoutes.js";


// CONSTANTS
const router = express.Router();


// ROUTES
router.use('/auth', authenticationRoutes);
router.use('/course', courseRoutes);
router.use('/student', studentRoutes);
router.use('/user', userRoutes);


// Student Routes



// EXPORTS
export default router;