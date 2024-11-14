import db from '../services/database.js';

export const getAllCourses = () => {
    return new Promise ((resolve, reject) => {
        db.query('SELECT * FROM courses', (err, rows) => {
            if (err) {
                reject(err);
            }
            resolve(rows);
        });
    });
}