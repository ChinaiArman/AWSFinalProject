import express from 'express';
import coursesRouter from './api/courses.js';

const app = express();
app.use('/api', coursesRouter);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});