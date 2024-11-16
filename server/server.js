// IMPORTS
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";

import Database from "./services/database.js";
import Cognito from "./services/Cognito.js";

import dbConfig from "./models/index.js";
import router from "./api/index.js";


// CONSTANTS
const PORT = process.env.PORT || 5000;
const app = express();


// AWS CONFIG
const cognitoServiceProvider = new CognitoIdentityProviderClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});


// SERVICES
const db = new Database(dbConfig);
const cognito = new Cognito(cognitoServiceProvider);


// MIDDLEWARE
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    req.db = db;
    req.cognito = cognito;
    next();
});
app.use((req, res, next) => {
    console.log(`[${req.method} Request]\t${req.url}\nDate: ${new Date()}\nParams: ${JSON.stringify(req.query, null, 2)}\nBody: ${JSON.stringify(req.body, null, 2)}\n------------------`)
    next()
})


// ROUTES
app.get('/', async (req, res) => {
    res.status(200).send("Hello World!")
});

app.use('/api', router);


// LISTEN
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
