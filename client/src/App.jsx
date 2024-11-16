import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import SignupPage from './pages/Signup';
import VerificationPage from "./pages/Verification"
import AdminFacultyManagementPage from "./pages/admin/FacultyManagement"
import AdminCourseManagementPage from "./pages/admin/CourseManagement"
import AdminAddFacultyPage from "./pages/admin/AddFaculty"
import AdminEditCoursePage from "./pages/admin/EditCourse"
import StudentMyCoursesPage from "./pages/student/MyCourses"
import StudentEnrollCoursesPage from "./pages/student/EnrollCourses"
import StudentMyTimetablePage from "./pages/student/MyTimetable"
import FacultyMyCoursesPage from "./pages/faculty/MyCourses"
import FacultyMyTimetablePage from "./pages/faculty/MyTimetable"
import FacultyTimeAvailabilityPage from "./pages/faculty/TimeAvailability"
import "./styles/App.css";

const App = () => {
  return (
    <div>
      <nav></nav>

      <Routes>
        {/* Redirect root to /login */}
        <Route path="/" element={<Navigate to="/login" replace />} />
        
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verification" element={<VerificationPage />} />

        {/* Admin Routes */}
        <Route path="/admin/faculty-management" element={<AdminFacultyManagementPage />} />
        <Route path="/admin/course-management" element={<AdminCourseManagementPage />} />
        <Route path="/admin/add-faculty" element={<AdminAddFacultyPage />} />
        <Route path="/admin/edit-course" element={<AdminEditCoursePage />} />

        {/* Student Routes */}
        <Route path="/student/my-courses" element={<StudentMyCoursesPage />} />
        <Route path="/student/enroll-courses" element={<StudentEnrollCoursesPage />} />
        <Route path="/student/my-timetable" element={<StudentMyTimetablePage />} />

        {/* Faculty Routes */}
        <Route path="/faculty/my-courses" element={<FacultyMyCoursesPage />} />
        <Route path="/faculty/my-timetable" element={<FacultyMyTimetablePage />} />
        <Route path="/faculty/time-availability" element={<FacultyTimeAvailabilityPage />} />

      </Routes>
    </div>
  );
};

export default App;