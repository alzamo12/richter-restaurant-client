import { useContext, useEffect, useState } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../providers/AuthProvider";
import shopIcon from '../../../assets/icon/151-1511569_cart-notifications-free-shopping-cart-favicon-hd-png-removebg-preview.png'
import { FaUserCircle } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import { sendEmailVerification } from "firebase/auth";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";
import { useQuery } from "@tanstack/react-query";

const NavBar = () => {
    const { user, logOut } = useAuth();
    const [isAdmin] = useAdmin();
    // const [userData, setUserData] = useState(null)
    const axiosPublic = useAxiosPublic();

    const { data: userData } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/checkValid/${user?.email}`)
            return res.data
        }
    })


    // useEffect(() => {
    //     if (user) {
    //         fetch(`https://richter-restaurant-server.vercel.app/checkValid/${user?.email}`)
    //             .then(res => res.json())
    //             .then(data => {
    //                 if (data) {
    //                     setUserData(data)
    //                 }
    //             })
    //     }
    // }, [user])


    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                // console.log(error)
            })
    };

    const handleVerify = async () => {
        if (user) {

            const res = await axiosPublic.get(`/sendMail/${user?.email}`)
            console.log(res)
        }
        else {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "It seems like You have not login yet",
                footer: "<a href='/login'>click here to Login</a>"
            });
        }
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/dashboard/cart">dashboard</Link></li>
        <li><Link to="/menu">our menu</Link></li>
        <li className="flex -mt-3"><Link to="/order/salad"><span className="">our shop </span><img className="w-16 h-12 " src={shopIcon} alt="" /></Link></li>
        {
            user && isAdmin ? <li><Link to="/dashboard/adminHome">Admin Home</Link></li> : <li><Link to="/dashboard/userHome">User Home</Link></li>
        }
        {
            user ?
                <><li><button onClick={handleLogout}>Sign Out <FaUserCircle className="text-2xl"></FaUserCircle></button></li></>
                :
                <><li><Link to="/login">Login <FaUserCircle className="text-2xl"></FaUserCircle></Link></li></>
        }
    </>

    return (
        <>
            <div className="navbar fixed z-10 bg-opacity-30 max-w-screen-xl   bg-black text-white">
                <div className="navbar-start">
                    <div className="dropdown">
                        <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h8m-8 6h16" />
                            </svg>
                        </div>
                        <ul
                            tabIndex={0}
                            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow text-black">
                            {navOptions}
                        </ul>
                    </div>
                    <div className="flex">
                        <a className="btn btn-ghost text-2xl cinzel font-extrabold ">Richter Restaurant  </a>
                        {
                            // user?.emailVerified ? userData?.isValid ? '' : <button className="btn btn-primary bg-green-600 hover:bg-green-800 border-none text-white" onClick={handleVerify}>Confirm Verification</button> : <button className="btn btn-primary bg-red-600 text-white border-none hover:bg-red-800" onClick={handleVerify}>Verify</button>
                            user?.emailVerified === false ? <button className="btn btn-primary bg-red-600 text-white border-none hover:bg-red-800" onClick={handleVerify}>Verify</button> : userData?.isValid === false ? <button className="btn btn-primary bg-green-600 hover:bg-green-800 border-none text-white" onClick={handleVerify}>Confirm Verification</button> : ''
                        }
                    </div>
                </div>
                <div className="navbar-center hidden lg:flex">
                    <ul className="menu menu-horizontal px-1 uppercase inter font-extrabold">
                        {navOptions}
                    </ul>
                </div>
            </div>
        </>
    );
};

export default NavBar;