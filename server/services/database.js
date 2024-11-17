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
            role
        });
        if (role > 0) {
            await Faculty.create({
                id: userId,
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                email,
                date_of_birth: dateOfBirth,
                phone_number: phoneNumber,
                is_admin: role === 2
            });
        } else {
            await Student.create({
                id: userId,
                user_id: userId,
                first_name: firstName,
                last_name: lastName,
                email,
                date_of_birth: dateOfBirth,
                phone_number: phoneNumber
            });
        }
    }

    async getAllCourses() {
        const courses = await Course.findAll();
        return courses;
    }

    async createCourse(courseId, facultyId, courseName, courseDescription, roomNumber, seatsAvailable, totalSeats) {
        console.log('Creating course:', courseId, facultyId, courseName, courseDescription, roomNumber, seatsAvailable, totalSeats);
        await Course.create({
            id: courseId,
            faculty_id: facultyId,
            course_name: courseName,
            course_description: courseDescription,
            room_number: roomNumber,
            seats_available: seatsAvailable,
            total_seats: totalSeats
        })

    }

    async getCoursesbyStudentId(studentId) {
        const courses = await Course.findAll({
            include: [
                {
                    model: Enrollment,
                    as: 'enrollment',
                    where: { student_id: studentId }
                }
            ]
        });
        return courses;
    }
}


// EXPORTS
export default Database;