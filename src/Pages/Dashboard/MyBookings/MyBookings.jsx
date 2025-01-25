import React from 'react';
import useAuth from '../../../hooks/useAuth';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import useAxiosPublic from '../../../hooks/useAxiosPublic';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import { FaTrashAlt } from 'react-icons/fa';

const MyBookings = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = useAuth();
    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/reservation/${user.email}`)
            return res.data
        }
    });


    // console.log(payments)
    return (
        <div>

            <div className="bg-[#F3F3F3] mx-1 md:pt-16 h-screen md:h-[104vh] -mt-5 pt-5  md:-mt-10 ">
                <SectionTitle
                    subHeading="At a Glance!!!"
                    heading="Payment History"
                ></SectionTitle>
                <div className="overflow-x-auto bg-white md:px-20  md:h-[650px] md:mx-32 mt-10">
                    <table className="table rounded-3xl my-10">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white rounded-3xl sticky top-0">
                            <tr className="uppercase inter font-semibold text-[10px] md:text-[16px] rounded-3xl">
                                <th className="py-9"></th>
                                <th className=''>Name</th>
                                <th>Guest</th>
                                <th>Price</th>
                                <th>Payent Date</th>
                            </tr>
                        </thead>
                        <tbody className="inter text-lg ">
                            {
                                payments.map((payment, index) => <tr className="hover ">
                                    <th className="py-7">{index + 1}</th>
                                    <td className='text-[12px] md:text-xl'>{payment.name}</td>
                                    <td className='text-[12px] md:text-xl'>{payment.guest}</td>
                                    <td className='text-[12px] md:text-xl'>{payment.price}</td>
                                    <td className='text-[8px] md:text-xl'>{payment.orderedDate || payment.date}</td>
                                </tr>)
                            }
                            {/* row 2 */}


                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default MyBookings;