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
        const user = await User.findOne({
            include: [
                {
                    model: Faculty,
                    as: 'faculty',
                    where: { email }, // Search Faculty table for email
                    required: false, // Optional, since the user might not have a faculty profile
                },
                {
                    model: Student,
                    as: 'student',
                    where: { email }, // Search Student table for email
                    required: false, // Optional, since the user might not have a student profile
                }
            ]
        });
        return user;
    }

    async createUser(userId, email, role, dateOfBirth, firstName, lastName, phoneNumber) {
        console.log('Creating user:', userId, email, role, dateOfBirth, firstName, lastName, phoneNumber);
        await User.create({
            id: userId,
            role,
            date_of_birth: dateOfBirth
        });
        if (role > 0) {
            await Faculty.create({
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber
            });
        } else {
            await Student.create({
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                email,
                phone_number: phoneNumber
            });
        }
    }
}


// EXPORTS
export default Database;