// IMPORTS
import express from "express";


// CONSTANTS
const authenticationRoutes = express.Router();


// ROUTES
authenticationRoutes.post('/login', async (req, res) => {
    res.status(200).json({ "message": "Login Page" });

});

authenticationRoutes.post('/register', async (req, res) => {
    const db = req.db;
    const cognito = req.cognito;
    const { email, password, role, dateOfBirth, firstName, lastName, phoneNumber } = req.body;
    try {
        const userId = await cognito.signUp(email, password).then(data => data.UserSub);
        db.createUser(userId, email, role, dateOfBirth, firstName, lastName, phoneNumber);
        req.session.userId = userId;
        res.status(200).json({ "message": "User created successfully" });
        return;
    } catch (error) {
        res.status(400).json({ "error": error.message });
        return;
    }
});

authenticationRoutes.post('/logout', async (req, res) => {
    res.status(200).json({ "message": "Logout Page" });
});


// EXPORTS
export default authenticationRoutes;