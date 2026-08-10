import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { FaNotEqual, FaPen, FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { deleteUser } from "firebase/auth";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();  // called successfully

    const { refetch, data: users = [] } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users');
            // console.log(res.data)
            return res.data
        }
    });
    // console.log(users)
    const handleDelete = (user) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                // console.log('user deleted successfully')
                axiosSecure.delete(`/users/${user._id}?email=${user.email}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            // console.log(res.data)
                            refetch()
                        }
                    })
                    .catch(error => {
                        // console.log(error)
                    })
            }
        });
    };

    const handleMakeAdmin = id => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then(result => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/admin/${id}`)
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Your work has been saved",
                                showConfirmButton: false,
                                timer: 1500
                            });
                        }
                    })
            }
        })
    }

    return (
        <div className="md:mx-20 lg:mx-44 mt-5 md:mt-10">
            {/* <h2 className="text-3xl">All Users</h2>
            <h2 className="text-3xl">Total Users: {users.length}</h2> */}
            <div className="w-full grid">
                <div className="stats shadow border border-primary mx-auto">
                    <div className="stat text-center">
                        <div className="stat-title">Total Estimated Users</div>
                        <div className="stat-value">{users?.length}</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
            </div>

            <div className="overflow-x-auto bg-white max-h-[70vh] lg:h-[650px] mt-10 lg:mt-20">
                <table className="table rounded-3xl h-full">
                    {/* head */}
                    <thead className="bg-[#D1A054] text-white rounded-3xl 
                    sticky top-0 z-30">
                        <tr className="uppercase inter font-semibold text-xs md:text-[16px] rounded-3xl">
                            <th className="hidden md:table-cell">#</th>
                            <th className="hidden md:table-cell">Name</th>
                            <th >email</th>
                            <th>Action</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody className="inter text-lg ">
                        {
                            users.map((user, index) => <tr
                                className="hover"
                                key={user._id}>
                                <td className="hidden md:table-cell">{index + 1}</td>
                                <td className="hidden md:table-cell">{user.name}</td>
                                <td>{user.email.split('@')[0]}</td>
                                <td>
                                    {user.role === 'admin' ? 'Admin' :
                                        <button
                                            onClick={() => handleMakeAdmin(user._id)}
                                            className="btn btn-neutral">
                                            <FaPen></FaPen>
                                        </button>
                                    }

                                </td>
                                <td>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className="btn  bg-red-600 text-white border-none">
                                        <FaTrashAlt></FaTrashAlt>
                                    </button>
                                </td>
                            </tr>)
                        }
                        {/* row 2 */}


                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllUsers;