import { useContext, useState } from "react";
import { FaAd, FaCalendar, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaStar } from "react-icons/fa";
import { NavLink, Outlet } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import useAdmin from "../hooks/useAdmin";
import { FaMarsAndVenus } from "react-icons/fa6";

const Dashboard = () => {

    const [isOpen, setIsOpen] = useState(true);
    const isAdmin = useAdmin();
    const admin = isAdmin[0];

    const handleNav = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className=" flex relative overflow-y-hidden">
            <div className={isOpen? "md:w-64 w-auto min-h-screen lg:block bg-[#D1A054] z-10 absolute lg:relative" : "md:w-64 w-auto min-h-screen lg:block bg-[#D1A054] z-10 relative lg:relative"}>
                <button className="w-6 md:hidden" onClick={handleNav}><FaMarsAndVenus></FaMarsAndVenus></button>
                {
                    isOpen ?
                        <ul className="menu p-4">
                            {
                                admin ?
                                    <>
                                        <li><NavLink to="/dashboard/adminHome"><FaHome></FaHome>Admin Home</NavLink></li>
                                        <li><NavLink to="/dashboard/addItems"><FaCalendar></FaCalendar>Add items</NavLink></li>
                                        <li><NavLink to="/dashboard/manageItems"><FaAd></FaAd>Manage Items</NavLink></li>
                                        <li><NavLink to="/dashboard/manageBookings"><FaList></FaList>Manage Bookings</NavLink></li>
                                        <li><NavLink to="/dashboard/users"><FaShoppingCart></FaShoppingCart>All User</NavLink></li>
                                    </>
                                    :
                                    <>
                                        <li><NavLink to="/dashboard/userHome"><FaHome></FaHome>User Home</NavLink></li>
                                        <li><NavLink to="/dashboard/reservation"><FaCalendar></FaCalendar>Reservation</NavLink></li>
                                        <li><NavLink to="/dashboard/history"><FaAd></FaAd>Payment History</NavLink></li>
                                        <li><NavLink to="/dashboard/bookings"><FaList></FaList>My Bookings</NavLink></li>
                                        <li><NavLink to="/dashboard/addReview"><FaStar></FaStar>Add Review</NavLink></li>
                                        <li><NavLink to="/dashboard/cart"><FaShoppingCart></FaShoppingCart>My Cart</NavLink></li>
                                    </>
                            }

                            <div className="divider"></div>
                            <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                            <li><NavLink to="/order/salad"><FaSearch></FaSearch>Menu</NavLink></li>
                            {/* <li><NavLink to="/dashboard/contact"><FaEnvelope></FaEnvelope>Contact</NavLink></li> */}
                        </ul> :
                        ''
        }

            </div>
            <div className="flex-1">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;