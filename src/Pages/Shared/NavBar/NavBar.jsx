import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../../../providers/AuthProvider";
import { FaShoppingCart } from "react-icons/fa";
import useCart from "../../../hooks/useCart";
import shopIcon from '../../../assets/icon/151-1511569_cart-notifications-free-shopping-cart-favicon-hd-png-removebg-preview.png'
import { FaUserCircle } from "react-icons/fa";
import useAdmin from "../../../hooks/useAdmin";

const NavBar = () => {
    const [isAdmin] = useAdmin();
    const { user, logOut } = useContext(AuthContext);
    const [cart] = useCart();
    console.log(user)
    const handleLogout = () => {
        logOut()
            .then(() => { })
            .catch(error => {
                console.log(error)
            })
    }

    const navOptions = <>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/contact">Contact us</Link></li>
        <li><Link to="/dashboard/cart">dashboard</Link></li>
        <li><Link to="/menu">our menu</Link></li>
        <li className="flex -mt-3"><Link to="/order/salad"><span className="">our shop </span><img className="w-16 h-12 " src={shopIcon} alt="" /></Link></li>
        {
            user && isAdmin ? <li><Link to="/dashboard/adminHome">Admin Home</Link></li> : <li><Link to="/dashboard/userHome">User Home</Link></li>
        }
        {/* <li><Link to="/dashboard/cart">
            <button className="btn">
                <FaShoppingCart></FaShoppingCart>
                <div className="badge badge-secondary">+{cart.length}</div>
            </button>
        </Link></li> */}
        {
            user ?
                <>
                    {/* <span>{user.displayName}</span> */}
                    <li><button onClick={handleLogout}>Sign Out <FaUserCircle className="text-2xl"></FaUserCircle></button></li>
                </> :
                <>        <li><Link to="/login">Login <FaUserCircle className="text-2xl"></FaUserCircle></Link></li>
                </>
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
                    <a className="btn btn-ghost text-3xl inter font-extrabold ">Richter Restaurant</a>
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