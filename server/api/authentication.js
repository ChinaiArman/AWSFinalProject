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
    const { email, password } = req.body;
    const user = await db.getUser(email);
    if (user) {
        res.status(400).send("User already exists");
        return;
    }
    const userId = await cognito.signUp(email, password).then(data => data.UserSub);
    db.createUser(userId, email);
    req.session.userId = userId;
    res.status(200).send("Register Page")
});

authenticationRoutes.post('/logout', async (req, res) => {
    res.status(200).send("Logout Page")
});


// EXPORTS
export default authenticationRoutes;