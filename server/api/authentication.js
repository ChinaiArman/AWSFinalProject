// IMPORTS
import express from "express";


// CONSTANTS
const authenticationRoutes = express.Router();


// ROUTES
authenticationRoutes.get('/login', async (req, res) => {
    res.status(200).send("Login Page")

});

authenticationRoutes.get('/register', async (req, res) => {
    const db = req.db;
    const cognito = req.cognito;
    const { email, password } = req.body;
    const userId = cognito.registerUser(email, password);
    db.createUser(userId, email);
});

authenticationRoutes.get('/logout', async (req, res) => {
    res.status(200).send("Logout Page")
});


// EXPORTS
export default authenticationRoutes;