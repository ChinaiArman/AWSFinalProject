// IMPORTS
import express from "express";


// CONSTANTS
const authenticationRoutes = express.Router();


// ROUTES
authenticationRoutes.get('/login', async (req, res) => {
    res.status(200).send("Login Page")
});

authenticationRoutes.get('/register', async (req, res) => {
    res.status(200).send("Register Page")
});

authenticationRoutes.get('/logout', async (req, res) => {
    res.status(200).send("Logout Page")
});


// EXPORTS
export default authenticationRoutes;