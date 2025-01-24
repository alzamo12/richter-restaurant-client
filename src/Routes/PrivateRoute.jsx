import { Children, useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { Navigate, replace, useLocation } from "react-router";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();
    console.log(location)

    if(loading){
        return <span className="loading loading-spinner loading-lg"></span>
    }
    if(user){
        return children
    }


    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default PrivateRoute;