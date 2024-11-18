import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { useFacultyAuth } from '../contexts/FacultyAuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useVerifiedAuth } from '../contexts/VerifiedAuthContext';
import { useUnverifiedAuth } from '../contexts/UnverifiedAuthContext';

const PrivateRoute = ({ element, role }) => {
    let isAuthorized = false;
    let loading = false;
    // Perform checks based on the role
    if (role === 'admin') {
        const { isAdmin, loading: adminLoading } = useAdminAuth();
        isAuthorized = isAdmin;
        loading = adminLoading;
    } else if (role === 'faculty') {
        const { isFaculty, loading: facultyLoading } = useFacultyAuth();
        isAuthorized = isFaculty;
        loading = facultyLoading;
    } else if (role === 'student') {
        const { isStudent, loading: studentLoading } = useStudentAuth();
        isAuthorized = isStudent;
        loading = studentLoading;
    } else if (role === 'verified') {
        const { isVerified, loading: verifiedLoading } = useVerifiedAuth();
        isAuthorized = isVerified;
        loading = verifiedLoading;
    } else if (role === 'unverified') {
        const { isUnverified, loading: unverifiedLoading } = useUnverifiedAuth();
        isAuthorized = isUnverified;
        loading = unverifiedLoading;
    }

    if (loading) {
        return <div>Loading...</div>;
    }

    if (isAuthorized) {
        return element;
    }

    return <Navigate to="/" />;
};

export default PrivateRoute;