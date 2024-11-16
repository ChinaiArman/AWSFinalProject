// IMPORTS
import express from "express";


// CONSTANTS
const authenticationRoutes = express.Router();


// ROUTES
authenticationRoutes.post('/login', async (req, res) => {
    res.status(200).send("Login Page")

});

authenticationRoutes.post('/register', async (req, res) => {
    const db = req.db;
    const cognito = req.cognito;
    const { email, password, role, dateOfBirth, firstName, lastName, phoneNumber } = req.body;
    const user = await db.getUser(email);
    if (user) {
        res.status(400).send("User already exists");
        return;
    }
    try {
        const userId = await cognito.signUp(email, password).then(data => data.UserSub);
        db.createUser(userId, email, role, dateOfBirth, firstName, lastName, phoneNumber);
        req.session.userId = userId;
        res.status(200).send("Registration successful");
        return;
    } catch (error) {
        console.error(error);
        res.status(400).send("Registration failed");
        return;
    }
});

authenticationRoutes.post('/logout', async (req, res) => {
    res.status(200).send("Logout Page")
});


// EXPORTS
export default authenticationRoutes;