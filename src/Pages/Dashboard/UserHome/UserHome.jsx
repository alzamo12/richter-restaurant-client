import { useQuery } from '@tanstack/react-query';
import useAuth from '../../../hooks/useAuth'
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { FaMoneyBill, FaShoppingCart } from 'react-icons/fa';
import { TbMoneybag } from 'react-icons/tb';
import { FaShop } from 'react-icons/fa6';
import defaultUser from '../../../assets/others/profile.png'
import { useEffect, useState } from 'react';

const UserHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();
    const [profileImg, setProfileImg] = useState('');

    const { data: stats } = useQuery({
        queryKey: ['user-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get(`/user-stats/${user.email}`)
            return res.data
        }
    })
    console.log(stats)

    useEffect(() => {
        if (user?.photoURL) {
            setProfileImg(user.photoURL)
        }
    }, [user.photoURL])

    return (
        <div className='lg:mx-10 mt-16 mx-4'>
            <h2 className="text-3xl">
                <span className='cinzel font-semibold'>Hi, Welcome Back!</span>
            </h2>
            {/* user stats section */}
            <div className="stats  flex flex-col lg:flex-row  gap-10 mt-7">
                <div className="stat flex justify-center bg-gradient-to-r from-[#BB34F5] to-[#FCDBFF] rounded-xl">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <TbMoneybag className='text-6xl text-white' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col text-center text-white'>
                        <div className="stat-value text-7xl">{stats?.orders}</div>
                        <div className="stat-title">Orders</div>
                    </div>
                </div>
                <div className="stat flex justify-center  bg-gradient-to-r from-[#D3A256] to-[#FDE8C0] rounded-xl">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <TbMoneybag className='text-6xl text-white' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col text-center text-white'>
                        <div className="stat-value text-7xl">{stats?.cartItems}</div>
                        <div className="stat-title">Cart Items</div>
                    </div>
                </div>
                <div className="stat flex justify-center bg-gradient-to-r from-[#FE4880] to-[#FECDE9] rounded-xl">
                    <div className="stat-figure text-secondary">
                        <div className="avatar">
                            <div className="w-16 rounded-full">
                                <TbMoneybag className='text-6xl text-white' />
                            </div>
                        </div>
                    </div>
                    <div className='flex flex-col text-center text-white'>
                        <div className="stat-value text-7xl">{stats?.bookings}</div>
                        <div className="stat-title">Bookings</div>
                    </div>
                </div>
            </div>
            <div className='w-full h-[100vh] md:h-[55vh] flex flex-col md:flex-row mt-10'>
                <div className='w-full py-10 md:w-1/2 h-full bg-[#FFEDD5] border-r-4 border-r-[#D1A054] flex flex-col justify-center items-center space-y-10'>
                    <div className='avatar'>
                        <div className="w-40 rounded-full">
                            <img src={profileImg || defaultUser} />
                        </div>
                    </div>
                    <h2 className="text-3xl cinzel font-semibold">{user?.displayName}</h2>
                </div>
                <div className='w-full md:w-1/2 h-full bg-[#FEF9C3] cinzel font-semibold uppercase py-[8%] px-20'>
                    <h2 className="text-4xl ">Your &nbsp; Activities</h2>
                    <div className='text-xl grid space-y-2 mt-10'>
                        <h4 className='text-[#0088FE] flex gap-3 items-center'><FaShoppingCart /> Orders: {stats?.orders}</h4>
                        <h4 className='text-[#00C4A1] flex gap-3 items-center'><FaShoppingCart /> review: {stats?.reviews}</h4>
                        <h4 className='text-[#FFBB28] flex gap-3 items-center'><FaShoppingCart /> bookings: {stats?.bookings}</h4>
                        <h4 className='text-[#FF8042] flex gap-3 items-center'><FaShoppingCart /> payment: {stats?.payment}</h4>
                    </div>
                </div>
            </div>
            {/* <div className='w-full h-[55vh] flex flex-col md:flex-row mt-10'>
                <div className='w-full py-10 md:w-1/2 h-full bg-[#FFEDD5] border-r-4 border-r-[#D1A054] flex flex-col justify-center items-center space-y-10'>
                    <div className='avatar'>
                        <div className="w-40 rounded-full">
                            <img src={profileImg || defaultUser} />
                        </div>
                    </div>
                    <h2 className="text-3xl cinzel font-semibold">{user?.displayName}</h2>
                </div>
                <div className='w-full md:w-1/2 h-full bg-[#FEF9C3] cinzel font-semibold uppercase py-[8%] px-20'>
                    <h2 className="text-4xl ">Your &nbsp; Activities</h2>
                    <div className='text-xl grid space-y-2 mt-10'>
                        <h4 className='text-[#0088FE] flex gap-3 items-center'><FaShoppingCart /> Orders: {stats?.orders}</h4>
                        <h4 className='text-[#00C4A1] flex gap-3 items-center'><FaShoppingCart /> review: {stats?.reviews}</h4>
                        <h4 className='text-[#FFBB28] flex gap-3 items-center'><FaShoppingCart /> bookings: {stats?.bookings}</h4>
                        <h4 className='text-[#FF8042] flex gap-3 items-center'><FaShoppingCart /> payment: {stats?.payment}</h4>
                    </div>
                </div>
            </div> */}
        </div>
    );
};

export default UserHome;