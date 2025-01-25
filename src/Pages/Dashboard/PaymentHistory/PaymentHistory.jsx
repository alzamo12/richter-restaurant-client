import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";

const PaymentHistory = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/payments/${user.email}`)
            return res.data
        }
    })
    console.log(payments)
    return (
        <div className="bg-[#F3F3F3] md:pt-16 h-screen md:h-[104vh] px-2 md:ml-0 md:-mt-10 overflow-y-hidden">
                <SectionTitle
                    subHeading="At a Glance!!!"
                    heading="Payment History"
                ></SectionTitle>
            <div className="overflow-x-auto bg-white md:px-20 max-h-[70vh] lg:h-[650px] md:mx-32 mt-10">
                <table className="table rounded-3xl my-10">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white rounded-3xl sticky top-0">
                        <tr className="uppercase inter font-semibold text-xs md:text-[16px] rounded-3xl">
                            <th className="py-9"></th>
                            <th className="hidden lg:grid mt-4">Email</th>
                            <th>price</th>
                            <th>Payent Date</th>
                        </tr>
                    </thead>
                    <tbody className="inter text-lg ">
                        {
                            payments.map((payment, index) => <tr className="hover ">
                                <th className="py-7">{index + 1}</th>
                                <td className="hidden lg:grid mt-4">{payment.email}</td>
                                <td className="">${payment.price}</td>
                                <td className="">{ payment.orderedDate || payment.date}</td>

                            </tr>)
                        }
                        {/* row 2 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PaymentHistory;