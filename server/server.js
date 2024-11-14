// IMPORTS
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from 'cors'
import bodyParser from "body-parser"
import coursesRouter from './api/courses.js';


// CONSTANTS
const PORT = process.env.PORT || 5000;
const app = express();


// MIDDLEWARE
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use((req, res, next) => {
    console.log(`[${req.method} Request]\t${req.url}\nDate: ${new Date()}\nParams: ${JSON.stringify(req.query, null, 2)}\nBody: ${JSON.stringify(req.body, null, 2)}\n------------------`)
    next()
})
app.use('/api', coursesRouter);


// ROUTES
app.get('/', async (req, res) => {
    res.status(200).send("Hello World!")
});


// LISTEN
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
