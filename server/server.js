// IMPORTS
// import dotenv from "dotenv";
import express from "express";
import cors from 'cors'
import bodyParser from "body-parser";
import { CognitoIdentityProviderClient } from "@aws-sdk/client-cognito-identity-provider";
import { SESClient } from "@aws-sdk/client-ses";

import Database from "./services/database.js";
import Cognito from "./services/Cognito.js";

import config from "./models/index.js";
import createSessionConfig from "./config/sessionConfig.js";
import router from "./api/index.js";


// ENVIRONMENT VARIABLES
// if (process.env.NODE_ENV !== "production") {
//     dotenv.config();
// }

console.log("ENVIRONMENT VARIABLES")
console.log(process.env)


// CONSTANTS
const PORT = process.env.PORT || 5001;
const app = express();
const { dbConfig, syncDatabase } = config;
const sessionConfig = createSessionConfig(dbConfig);


// SYNC DATABASE
syncDatabase();


// AWS CONFIG
const cognitoClient = new CognitoIdentityProviderClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});
const sesClient = new SESClient({
    region: "us-west-2",
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY,
        secretAccessKey: process.env.AWS_SECRET_KEY
    }
});


// SERVICES
const db = new Database(dbConfig);
const cognito = new Cognito(cognitoClient);


// MIDDLEWARE
const corsOptions = {
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(sessionConfig);

app.use((req, res, next) => {
    console.log('Session ID (from cookie):', req.sessionID); // Logs the session ID
    console.log('Session Data (from store):', req.session); // Logs the session data
    next(); // Proceeds to the next middleware or route
});

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
