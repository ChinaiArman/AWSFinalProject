// IMPORTS
import express from "express";

import authenticationRoutes from "./authentication.js";


// CONSTANTS
const router = express.Router();


// ROUTES
router.use('/auth', authenticationRoutes);


// EXPORTS
export default router;