// IMPORTS
import Course from '../models/Course.js';
import CourseRuntime from '../models/CourseRuntime.js';
import Enrollment from '../models/Enrollment.js';
import Faculty from '../models/Faculty.js';
import FacultyAvailability from '../models/FacultyAvailability.js';
import Student from '../models/Student.js';
import Waitlist from '../models/Waitlist.js';
import User from '../models/User.js';


// CONSTANTS


// CLASS
class Database {
    constructor(dbConfig) {
        this.dbConfig = dbConfig;
    }

    async getUser(email) {
        try {
            const user = await User.findOne({
                where: { email },  // Match the user by email
                include: [           // Optionally include related models if needed
                    {
                        model: Faculty,   // Include Faculty if you need related data
                        as: 'faculty'
                    },
                    {
                        model: Student,   // Include Student if you need related data
                        as: 'student'
                    }
                ]
            });

            if (!user) {
                throw new Error(`User with email ${email} not found.`);
            }

            return user;
        } catch (error) {
            console.error(error);
            throw new Error('Error retrieving user');
        }
    }
}


// EXPORTS
export default Database;