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
           
            <div className="bg-[#F3F3F3] pt-16 h-[104vh]  md:-mt-10 ">
                <SectionTitle
                    subHeading="At a Glance!!!"
                    heading="Payment History"
                ></SectionTitle>
                <div className="overflow-x-auto bg-white px-20  h-[650px] mx-32 mt-10">
                    <table className="table rounded-3xl my-10">
                        {/* head */}
                        <thead className="bg-[#D1A054] text-white rounded-3xl sticky top-0">
                            <tr className="uppercase inter font-semibold text-[16px] rounded-3xl">
                                <th className="py-9"></th>
                                <th>Name</th>
                                <th>Guest</th>
                                <th>Price</th>
                                <th>Payent Date</th>
                            </tr>
                        </thead>
                        <tbody className="inter text-lg ">
                            {
                                payments.map((payment, index) => <tr className="hover ">
                                    <th className="py-7">{index + 1}</th>
                                    <td>{payment.name}</td>
                                    <td>{payment.guest}</td>
                                    <td>{payment.price}</td>
                                    <td>{payment.orderedDate || payment.date}</td>
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