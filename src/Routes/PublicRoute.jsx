import { getAuth } from 'firebase/auth';
import { Navigate, useLocation } from 'react-router';
import useAuth from '../hooks/useAuth';

const PublicRoute = ({children}) => {
    const location = useLocation();
    const {user} = useAuth();

    if(user){
        return <Navigate to="/"></Navigate>
    }

    return  children
};

export default PublicRoute;