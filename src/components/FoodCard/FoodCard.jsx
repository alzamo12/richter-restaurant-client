import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from "react-router";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import useCart from "../../hooks/useCart";
import { use } from "react";
import { sendEmailVerification, sendSignInLinkToEmail } from "firebase/auth";
import useAxiosPublic from "../../hooks/useAxiosPublic";

const FoodCard = ({ item }) => {

    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const axiosPublic = useAxiosPublic();
    const [, refetch] = useCart();
    const auth = useAuth();
    // console.log(location)
    // console.log(user);

    const handleAddToCart = async(food) => {
        if (user && user.email) {
            // const {data:isValid} = await axiosSecure.get(`checkValid/${user.email}`);
            if (user.emailVerified) {
                const cartItem = {
                    menuId: _id,
                    email: user.email,
                    name,
                    image,
                    price
                }
                axiosSecure.post('/carts', cartItem)
                    .then(res => {
                        // console.log(res.data)
                        if (res.data.insertedId) {
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: `${name} added to your cart`,
                                showConfirmButton: false,
                                timer: 1500
                            });
                            refetch()
                        }
                    })
            }
            else {
                Swal.fire({
                    title: "Please Verify your email",
                    text: "Please Login t add to the cart",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Yes, Login"
                }).then(async(result) => {
                    if (result.isConfirmed) {
                        const userInfo = {
                            name: user.displayName,
                            email: user.email,
                            // uid: user.uid,
                        }
                    const res = await axiosSecure.get(`/sendMail?userInfo=${userInfo}`, {
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                        alert('email sent')
                    }
                });
            }
        }
        else {
            Swal.fire({
                title: "You are not Logged in",
                text: "Please Login t add to the cart",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login"
            }).then((result) => {
                if (result.isConfirmed) {
                    //   send the user to the login page
                    navigate('/login', { state: { from: location } })
                }
            });
        }
    }
    return (
        <div className="card rounded-none bg-[#F3F3F3] w-full shadow-xl mx-auto">
            <figure>
                <img
                    className="w-full"
                    src={image}
                    alt="Shoes" />
            </figure>
            <p className="absolute right-0 bg-slate-900 text-white px-4 mr-2 md:mr-0">${price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button
                        onClick={() => handleAddToCart(item)}
                        className="btn bg-slate-200 rounded-md hover:bg-[#111827] btn-outline border-[#BB8506] hover:border-[#BB8506] border-b-2  border-0 text-[#BB8506] hover:text-[#BB8506] inter font-medium text-base md:text-lg px-6">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;