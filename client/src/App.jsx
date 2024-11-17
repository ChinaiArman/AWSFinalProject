import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/Login';
import VerificationPage from "./pages/Verification"
import UserManagement from './pages/admin/UserManagement';
import AdminCourseManagementPage from "./pages/admin/CourseManagement"
import AdminAddUserPage from "./pages/admin/AddUser"
import AdminAddCoursePage from "./pages/admin/AddCourse"
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
        {/* Public Routes */}
        <Route path="/" element={<LoginPage />} />
        <Route path="/verification" element={<VerificationPage />} />
        <Route path="/password-setup" element={<PasswordSetupPage />} />

        {/* Admin Routes */}
        <Route path="/admin/user-management" element={<UserManagement />} />
        <Route path="/admin/course-management" element={<AdminCourseManagementPage />} />
        <Route path="/admin/add-user" element={<AdminAddUserPage />} />
        <Route path="/admin/add-course" element={<AdminAddCoursePage />} />

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