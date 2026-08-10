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


            {/* <button className="w-6 md:hidden absolute top-0 left-0" onClick={handleNav}>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="inline-block h-5 w-5 stroke-current">
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"></path>
            </svg></button> */}
            {/* <div className={isOpen ? "md:w-64 w-auto min-h-screen hidden lg:block bg-[#D1A054] z-[100] relative  md:relative"
                :
                "md:w-64 w-auto min-h-screen lg:block bg-[#D1A054] z-10 relative lg:relative"}>
                <button className={isOpen ? "w-6 md:hidden absolute top-0 right-0" : "hidden"} onClick={handleNav}> <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    className="inline-block h-5 w-5 stroke-current">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 6h16M4 12h16M4 18h16"></path>
                </svg></button>
                {
                    isOpen ?
                        <ul className="menu p-4 text-base gap-5">
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
                        </ul> :
                        ''
                }

            </div> */}
            {/* mobile dashboard layout */}
            <div className="drawer lg:drawer-open h-screen overflow-hidden">
                <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                <div className="drawer-content flex flex-col h-screen overflow-hidden">
                    {/* <div className="w-screen bg-primary h-12 block lg:hidden"> */}
                    <label htmlFor="my-drawer"
                        className="btn text-white bg-primary px-4 py-4 rounded-full
                             font-bold border-none shadow-none drawer-button absolute left-1 top-1 lg:hidden"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-5 w-5 stroke-current">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </label>
                    {/* </div> */}
                    <div className="flex-1 overflow-auto mt-16 md:mt-10 lg:mt-auto mx-2 lg:mx-0">
                        <Outlet></Outlet>
                    </div>
                </div>
                <div className="drawer-side z-50 top-0">
                    <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                    <div className={"w-64  min-h-screen  bg-[#D1A054]  relative z-50"}>


                        <ul className="menu p-4 text-base gap-5">
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

                            <div className="divider bg-neutral h-[3px]"></div>
                            <li><NavLink to="/"><FaHome></FaHome>Home</NavLink></li>
                            <li><NavLink to="/order/salad"><FaSearch></FaSearch>Menu</NavLink></li>
                            {/* <li><NavLink to="/dashboard/contact"><FaEnvelope></FaEnvelope>Contact</NavLink></li> */}
                        </ul>
                    </div>
                </div>
            </div>
            {/* <div className="flex-1 overflow-auto">
                <Outlet></Outlet>
            </div> */}
        </div>
    );
};

export default Dashboard;