import { useContext } from "react";
import { FaGoogle } from "react-icons/fa";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const SocialLogin = () => {
    const { googleSignIn } = useContext(AuthContext);
    const axiosPublic = useAxiosPublic();

    const handleGoogleSignIn = () => {
        googleSignIn()
        .then(result => {
            console.log(result.user)
            const userInfo = {
                name: result.user?.displayName,
                email: result.user?.email
            };
            axiosPublic.post('/users', userInfo)
            .then(res => {
                console.log(res.data)
            })
        })
        .catch(error => {
            console.log(error)
        })
    }

    return (
        <div className="ml-4 mt-2">
            <div className="btn btn-neutral p-4">
                <button onClick={handleGoogleSignIn} className="flex gap-2">  <FaGoogle></FaGoogle>Google</button>
            </div>
        </div>
    );
};

export default SocialLogin;