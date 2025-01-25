import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import { Link, replace, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";

const SocialLogin = ({message, linkMessage, isLogin}) => {
    const { googleSignIn, loading } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/';

    const handleGoogleSignIn = () => {
        googleSignIn()
            .then(result => {
                const userInfo = {
                    name: result.user?.displayName,
                    email: result.user?.email,
                    isValid: result.user?.emailVerified
                };
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        console.log(res.data)
                        Swal.fire({
                            title: "You have login successfully",
                            showClass: {
                                popup: `
                                                animate__animated
                                                animate__fadeInUp
                                                animate__faster
                                              `
                            },
                            hideClass: {
                                popup: `
                                                animate__animated
                                                animate__fadeOutDown
                                                animate__faster
                                              `
                            }
                        });
                        navigate(from, { replace: true })
                    })
            })
            .catch(error => {
                // console.log(error)
            })
    }

    return (
       
            <div className="text-center grid gap-1 inter font-medium ">
                <p className="text-[#D1A054]">{message} <Link to={isLogin ? '/signup' : '/login' }>{linkMessage}</Link></p>
                <p>Or {isLogin ? 'sign in with' : 'sign up with'}</p>
                <button onClick={handleGoogleSignIn} className="btn btn-outline w-12 h-12 mx-auto rounded-full p-4 ">
                    <FaGoogle></FaGoogle>
                </button>
            </div>
    );
};

export default SocialLogin;