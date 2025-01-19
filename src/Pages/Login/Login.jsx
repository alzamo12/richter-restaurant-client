import { useContext, useEffect, useRef, useState } from 'react';
import { loadCaptchaEnginge, LoadCanvasTemplate, LoadCanvasTemplateNoReload, validateCaptcha } from 'react-simple-captcha';
import { AuthContext } from '../../providers/AuthProvider';
import { Link, useLoaderData, useLocation, useNavigate } from 'react-router';
import { Helmet } from 'react-helmet-async';
import Swal from 'sweetalert2';
import SocialLogin from '../../components/SocialLogin/SocialLogin';
import './Login.css'
import loginImg from '../../assets/others/authentication2.png'


const Login = () => {
    const captchaRef = useRef(null);
    const [disabled, setDisabled] = useState(true);
    const { signIn } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    let from = location.state?.from?.pathname || '/';
    // console.log( from)

    useEffect(() => {
        loadCaptchaEnginge(6)
    }, [])

    const handleLogin = e => {
        e.preventDefault()
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user)
                Swal.fire({
                    title: "You have Successfully Login",
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
            .catch(error => {
                Swal.fire({
                    title: "Please Login Again",
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
            })
    };

    const handleValidateCaptcha = (e) => {
        const user_captcha_value = e.target.value;
        // console.log(user_captcha_value)
        if (validateCaptcha(user_captcha_value)) {
            setDisabled(false)
        }
        else {
            setDisabled(true)
        }
    }

    return (
        <>
            <Helmet>
                <title>Richter | Login</title>
            </Helmet>
            <div className="hero min-h-screen auth-background">
                <div className="hero-content px-28 shadow-2xl border-2 h-4/5 max-w-[85%] w-[85%] gap-[20%] flex-col md:flex-row">
                    <div className="text-center md:w-1/2 lg:text-left">
                       <img className='w-[100%]' src={loginImg} alt="" />
                    </div>
                    <div className="card md:w-1/2  ">
                    <h2 className="text-4xl inter font-bold text-center">Login</h2>
                        <form onSubmit={handleLogin} className="card-body w-full inter text-xl font-semibold gap-5">
                            {/* email */}
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" name="email" placeholder="email" className="input input-bordered w-full" required />
                            </div>
                            {/* password */}
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" name="password" placeholder="password" className="input input-bordered" required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            {/* recaptcha */}
                            <div className="form-control gap-5">
                                <label className="w-full ">
                                    <LoadCanvasTemplate />
                                </label>
                                <input onBlur={handleValidateCaptcha} type="text" name="captcha" placeholder="Type the text above" className="input input-bordered" />
                                {/* <button className='btn btn-outline btn-xs'>Validate</button> */}
                            </div>
                            {/* submit btn 
                            TODO: Apply disabled for recaptcha*/}
                            <div className="form-control mt-6">
                                <input className="btn btn-primary bg-[#D1A054] text-white border-none" type="submit" value="Submit" disabled={disabled} />
                            </div>
                        </form>
                        <SocialLogin
                            message={"New here?"}
                            linkMessage="Create a New Account"
                            isLogin={true}
                        ></SocialLogin>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;