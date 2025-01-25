import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { Rating } from '@smastrom/react-rating'

import '@smastrom/react-rating/style.css'
import { useState } from "react";
import { useForm } from "react-hook-form";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useAuth from "../../../hooks/useAuth";
import Swal from "sweetalert2";
import { FaRocket } from "react-icons/fa";

const AddReview = () => {
    const { user } = useAuth();
    const [rating, setRating] = useState(0);
    const {
        register,
        handleSubmit,
        reset,
        formState,
        formState: { errors, isSubmitSuccessful },
    } = useForm();
    const axiosSecure = useAxiosSecure();

    const onSubmit = async (data) => {
        const review = {
            name: user.displayName,
            email: user.email,
            favoriteRecipe: data.FavoriteRecipe,
            suggestion: data.suggestion,
            details: data.details,
            rating: rating
        }

        // console.log(review)
        const res = await axiosSecure.post('/reviews', review);
        // console.log(res.data)

        if (res.data.insertedId) {
            Swal.fire({
                title: "Thanks for rating us!",
                icon: "success",
                draggable: true
            });
        }
    }

    return (
        <div>
            <SectionTitle
                subHeading="Sharing is Caring"
                heading="Give a Review..."
            ></SectionTitle>
            <div className="bg-[#F3F3F3] mt-10 mx-[5%] md:mx-[10%] px-[5%] md:px-[10%] py-10">
                <form onSubmit={handleSubmit(onSubmit)} className=" grid space-y-5" action="">
                    <div className="grid gap-5 w-full">
                        <h2 className="text-4xl cinzel font-medium uppercase text-[32px] mx-auto">Rate Us!</h2>
                        <Rating
                            style={{ maxWidth: 180 }}
                            value={rating}
                            onChange={setRating}
                            className="mx-auto"
                        />
                    </div>
                    {/* liked most recipe */}
                    <div className="form-control w-full inter font-semibold text-lg">
                        <label className="label">
                            <span className="label-text">Which Recipe you liked most</span>
                        </label>
                        <input type="text" {...register("FavoriteRecipe", { required: true })} placeholder="Recipe you liked most" className="input input-bordered w-full py-8" required />
                    </div>
                    {/* suggestion */}
                    <div className="form-control w-full inter font-semibold text-lg">
                        <label className="label">
                            <span className="label-text">Do you have any suggestion for us?</span>
                        </label>
                        <input type="text" {...register("suggestion", { required: true })} placeholder="Suggestion" className="input input-bordered w-full py-8" required />
                    </div>
                    {/* liked most recipe */}
                    <div className="form-control w-full inter font-semibold text-lg">
                        <label className="label">
                            <span className="label-text">Kindly express your care in a short way</span>
                        </label>
                        <textarea
                            {...register("details", { required: true })}
                            placeholder="Review in detail"
                            className="textarea h-44 textarea-bordered textarea-lg w-full ">
                        </textarea>
                    </div>
                    <div className="">
                        <button className="btn btn-primary bg-[#B58130] flex gap-2  border-none text-white text-lg rounded-none" type="submit">Send Review <FaRocket className="text-2xl"></FaRocket></button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddReview;