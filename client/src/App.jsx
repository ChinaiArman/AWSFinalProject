import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { StudentAuthProvider } from './contexts/StudentAuthContext';
import { FacultyAuthProvider } from './contexts/FacultyAuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { VerifiedAuthProvider } from './contexts/VerifiedAuthContext';
import { UnverifiedAuthProvider } from './contexts/UnverifiedAuthContext';
import PrivateRoute from './components/PrivateRoute';
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
import PasswordSetupPage from "./pages/PasswordSetup"
import "./styles/App.css";
import ProfileContainer from './pages/ProfileContainer';


const App = () => {
  return (
    <div>
      <UnverifiedAuthProvider>
        <VerifiedAuthProvider>
          <StudentAuthProvider>
            <FacultyAuthProvider>
              <AdminAuthProvider>
                <Router>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/verification" element={<VerificationPage />} />
                    <Route path="/password-setup" element={<PasswordSetupPage />} />

                    {/* Admin Routes */}
                    <Route path="/admin/profile" element={
                      <PrivateRoute role="admin" element={<ProfileContainer role="admin"/>} />
                    } />
                    <Route path="/admin/user-management" element={
                      <PrivateRoute role="admin"
                        element={<UserManagement />}
                      />
                    } />
                    <Route path="/admin/course-management" element={
                      <PrivateRoute role="admin"
                        element={<AdminCourseManagementPage />}
                      />
                    } />
                    <Route path="/admin/add-user" element={
                      <PrivateRoute role="admin"
                        element={<AdminAddUserPage />}
                      />
                    } />
                    <Route path="/admin/add-course" element={
                      <PrivateRoute role="admin"
                        element={<AdminAddCoursePage />}
                      />
                    } />

                    {/* Student Routes */}
                    <Route path="/student/profile" element={
                      <PrivateRoute role="student" element={<ProfileContainer role="student"/>} />
                    } />
                    <Route path="/student/my-courses" element={
                      <PrivateRoute role="student"
                        element={<StudentMyCoursesPage />}
                      />
                    } />
                    <Route path="/student/enroll-courses" element={
                      <PrivateRoute role="student"
                        element={<StudentEnrollCoursesPage />}
                      />
                    } />
                    <Route path="/student/my-timetable" element={
                      <PrivateRoute role="student"
                        element={<StudentMyTimetablePage />}
                      />
                    } />

                    {/* Faculty Routes */}
                    <Route path="/faculty/profile" element={
                      <PrivateRoute role="faculty" element={<ProfileContainer role="faculty"/>} />
                    } />
                    <Route path="/faculty/my-courses" element={
                      <PrivateRoute role="faculty"
                        element={<FacultyMyCoursesPage />}
                      />
                    } />
                    <Route path="/faculty/my-timetable" element={
                      <PrivateRoute role="faculty"
                        element={<FacultyMyTimetablePage />}
                      />
                    } />
                    <Route path="/faculty/time-availability" element={
                      <PrivateRoute role="faculty"
                        element={<FacultyTimeAvailabilityPage />}
                      />
                    } />
                  </Routes>
                </Router>
              </AdminAuthProvider>
            </FacultyAuthProvider>
          </StudentAuthProvider>
        </VerifiedAuthProvider>
      </UnverifiedAuthProvider>
    </div>
  );
};

export default App;