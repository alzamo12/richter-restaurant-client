import React, { useContext } from 'react';
import useAuth from '../hooks/useAuth';
import useAdmin from '../hooks/useAdmin';
import { Navigate, useLocation } from 'react-router';
import { AuthContext } from '../providers/AuthProvider';

const AdminRoute = ({children}) => {
    const {user, loading} = useAuth()
    const [isAdmin, isAdminLoading] = useAdmin();
    const location = useLocation();
    if (loading || isAdminLoading) {
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if (user && isAdmin) {
        return children
    }
    return <Navigate to="/" state={{ from: location }}></Navigate>
};

export default AdminRoute;