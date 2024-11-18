import { Navigate } from 'react-router-dom';
import { useStudentAuth } from '../contexts/StudentAuthContext';
import { useFacultyAuth } from '../contexts/FacultyAuthContext';
import { useAdminAuth } from '../contexts/AdminAuthContext';
import { useVerifiedAuth } from '../contexts/VerifiedAuthContext';
import { useUnverifiedAuth } from '../contexts/UnverifiedAuthContext';

const PrivateRoute = ({ element, role }) => {
    const { isStudent, loading: studentLoading } = useStudentAuth();
    const { isFaculty, loading: facultyLoading } = useFacultyAuth();
    const { isAdmin, loading: adminLoading } = useAdminAuth();
    const { isVerified, loading: verifiedLoading } = useVerifiedAuth();
    const { isUnverified, loading: unverifiedLoading } = useUnverifiedAuth();

    const loading = studentLoading || facultyLoading || adminLoading || verifiedLoading || unverifiedLoading;

    if (loading) {
        return <div>Loading...</div>;
    }
    if (role === 'admin' && isAdmin) {
        return element;
    }
    if (role === 'faculty' && (isFaculty || isAdmin)) {
        return element;
    }
    if (role === 'student' && (isStudent || isAdmin)) {
        return element;
    }
    if (role === 'verified' && isVerified) {
        return element;
    }
    if (role === 'unverified' && isUnverified) {
        return element;
    }
    return <Navigate to="/" />;
}

export default PrivateRoute;