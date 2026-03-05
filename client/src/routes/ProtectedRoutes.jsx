import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    console.log('Token in ProtectedRoute:', token);
    if (!token) {
        return <Navigate to="/admin/login" replace />;
    }

    return children;
};

export default ProtectedRoute;