import { Outlet } from 'react-router';
import Footer from '../Pages/Shared/Footer/Footer';
import NavBar from '../Pages/Shared/NavBar/NavBar';
import useAuth from '../hooks/useAuth';

const Main = () => {

    const {loading} = useAuth();

    return (
        <div className='max-w-screen-xl lg:mx-auto'>
            <NavBar></NavBar>
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;