import { useContext, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../providers/AuthProvider";
import useAxiosPublic from "../../hooks/useAxiosPublic";
import SocialLogin from "../../components/SocialLogin/SocialLogin";
import signUpImg from '../../assets/others/authentication2.png'
import './signUp.css'
import { Link, useLocation, useNavigate } from "react-router";
import Swal from "sweetalert2";


const SignUp = () => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const axiosPublic = useAxiosPublic();

    const { createUser, updateUserProfile } = useContext(AuthContext);

    const onSubmit = data => {
        // console.log()
        createUser(data.email, data.password)
            .then((result) => {
                const loggedUser = result.user;
                updateUserProfile(data.name, data.photoURL)
                    .then((result) => {
                        const userInfo = {
                            name: data.name,
                            email: data.email,
                            uid: loggedUser.uid
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res.data)
                                Swal.fire({
                                    title: "You have Successfully Created an account",
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
                                navigate('/')
                            })
                    })
                    .catch(error => {
                        console.log(error)
                    })
            })
            .catch(error => {
                // console.log(error)
            })
    }

    useEffect(() => {
        if (formState.isSubmitSuccessful) {
            reset({
                name: '',
                email: '',
                password: ''
            })
        }
    }, [formState, reset])


    return (
        <>
            <Helmet>
                <title>Richter | Sign Up</title>
            </Helmet>
            <div className="hero min-h-screen p-0 auth-background">
                <div className="hero-content  md:max-w-[85%] w-full md:w-[85%] md:px-28 md:shadow-2xl h-4/5 md:gap-[5%] flex-col lg:flex-row-reverse">
                    <div className="text-center hidden lg:grid md:w-1/2 lg:text-left">
                        <img className='w-[100%]' src={signUpImg} alt="" />
                    </div>
                    {/* form */}
                    <div className="card w-full lg:w-1/2 shrink-0 p-0">
                        <h2 className="text-4xl inter font-bold text-center">Sign Up</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="card-body p-0 w-full md:w-3/4 md:mx-auto inter font-semibold text-xl">
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                {/* name input */}
                                <input type="text" {...register("name", { required: true })} placeholder="Name" className="input input-bordered" />
                                {errors.name && <span className="text-red-600">This field is required</span>}
                            </div>
                            {/* name */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">photo URL</span>
                                </label>
                                {/* photo URL input */}
                                <input type="text" {...register("photoURL", { required: true })} placeholder="Photo URL" className="input input-bordered" />
                                {errors.photoURL && <span className="text-red-600">Photo URL is required</span>}
                            </div>
                            {/* email */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                {/* email input */}
                                <input type="email" {...register("email", { required: true })} placeholder="email" className="input input-bordered" />
                                {errors.email && <span className="text-red-600">This field is required</span>}
                            </div>
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                {/* password input */}
                                <input
                                    type="password"
                                    {...register("password",
                                        {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20,
                                            pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/
                                        })}
                                    placeholder="password"
                                    className="input input-bordered" />
                                {/* validation style */}
                                {errors.password?.type === 'required' &&
                                    <p className="text-red-600">Password is required</p>}
                                {errors.password?.type === 'minLength' &&
                                    <p className="text-red-600">Password must be 6 characters</p>}
                                {errors.password?.type === 'pattern' && <p>Password must have one uppercase, one
                                    lowercase, one number, and special characters</p>}
                                {/* forget password */}
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* button or submit */}
                            <div className="form-control mt-6 mb-5">
                                {/* <button className="btn btn-primary">Login</button> */}
                                <input className="btn btn-primary bg-[#D1A054] text-white border-none" type="submit" value="Submit" />
                            </div>
                        </form>
                        <SocialLogin
                            message="Already Registered?"
                            linkMessage="Go to log in"
                            isLogin={false}
                        ></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SignUp;