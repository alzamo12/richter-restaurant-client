import { createBrowserRouter } from 'react-router-dom';
import Main from '../LayOut/Main'
import Home from '../Pages/Home/Home/Home'
import Order from '../Pages/Order/Order/Order'
import PrivateRoute from '../Routes/PrivateRoute'
import Dashboard from '../LayOut/Dashboard'
import Cart from '../Pages/Dashboard/Cart/Cart'
import AdminRoute from '../Routes/AdminRoute'
import AllUsers from '../Pages/Dashboard/AllUsers/AllUsers'
import AddItems from '../Pages/Dashboard/AddItems/AddItems'
import ManageItems from '../Pages/Dashboard/ManageItems/ManageItems'
import UpdateItem from '../Pages/Dashboard/UpdateItem/UpdateItem';
import Menu from '../Pages/Menu/Menu/Menu'
import Login from '../Pages/Login/Login'
import SignUp from '../Pages/SignUp/SignUp'
import Payment from '../Pages/Dashboard/Payment/Payment';
import PaymentHistory from '../Pages/Dashboard/PaymentHistory/PaymentHistory';
import UserHome from '../Pages/Dashboard/UserHome/UserHome';
import AdminHome from '../Pages/Dashboard/AdminHome/AdminHome';
import Reservation from '../Pages/Dashboard/Rservation/Reservation';
import MyBookings from '../Pages/Dashboard/MyBookings/MyBookings';
import AddReview from '../Pages/Dashboard/AddReview/AddReview';

import PublicRoute from './PublicRoute';

export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            { path: '/', element: <Home></Home> },
            { path: 'menu', element: <Menu /> },
            { path: 'order/:category', element: <Order /> },
        ],
    },
    {
        path: '/dashboard',
        element: <PrivateRoute><Dashboard /></PrivateRoute>,
        children: [
            { path: 'userHome', element: <UserHome /> },
            { path: 'cart', element: <Cart /> },
            { path: 'payment', element: <Payment /> },
            { path: 'history', element: <PaymentHistory /> },
            { path: 'reservation', element: <Reservation></Reservation> },
            { path: 'bookings', element: <MyBookings></MyBookings> },
            { path: 'addReview', element: <AddReview></AddReview> },
            // admin Routes
            { path: 'adminHome', element: <AdminRoute><AdminHome /></AdminRoute> },
            { path: 'users', element: <AdminRoute><AllUsers /></AdminRoute> },
            { path: 'addItems', element: <AdminRoute><AddItems /></AdminRoute> },
            { path: 'manageItems', element: <AdminRoute><ManageItems /></AdminRoute> },
            {
                path: 'update/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/menu/${params.id}`),
                element: <AdminRoute><UpdateItem /></AdminRoute>
            },
        ],
    },
    { path: 'login', element: <PublicRoute><Login /> </PublicRoute> },
    { path: 'signup', element: <PublicRoute> <SignUp /></PublicRoute> },
]);

