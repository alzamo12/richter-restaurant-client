import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../hooks/useAuth";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaDollarSign, FaJediOrder, FaUser } from "react-icons/fa";

const AdminHome = () => {
    const { user } = useAuth();
    const axiosSecure = useAxiosSecure();

    const { data: stats, isLoading} = useQuery({
        queryKey: ['admin-stats'],
        queryFn: async () => {
            const res = await axiosSecure.get('/admin-stats'); 
            return res.data
        }
    })

    if(isLoading){
        return <span className="loading loading-dots loading-xs"></span>
    }
    // console.log(stats)
    return (
        <div>
            <h2 className="text-3xl">
                <span>Hi, Welcome</span>
                {
                    user?.displayName ? user?.displayName : 'Back'
                }
            </h2>
            <div className="stats shadow">
                {/* revenue  */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaDollarSign className="text-3xl"></FaDollarSign>
                    </div>
                    <div className="stat-title">Revenue</div>
                    <div className="stat-value">${stats?.revenue}</div>
                    <div className="stat-desc">Jan 1st - Feb 1st</div>
                </div>
                  {/* state 2 */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <FaUser></FaUser>
                    </div>
                    <div className="stat-title"> Users</div>
                    <div className="stat-value">{stats?.users}</div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
                  {/* state 3 */}
                <div className="stat">
                    <div className="stat-figure text-secondary">
                       <FaJediOrder></FaJediOrder>
                    </div>
                    <div className="stat-title">Orders</div>
                    <div className="stat-value">{stats.orders}</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>
        </div>
    );
};

export default AdminHome;