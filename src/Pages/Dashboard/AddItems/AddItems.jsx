import { useForm } from "react-hook-form";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const AddItems = () => {
    const { register, handleSubmit } = useForm();
    const axiosPublic = useAxiosPublic();
    const axiosSecure = useAxiosSecure();
    const onSubmit = async (data) => {
        // console.log(data);
        const imageFile = { image: data.image[0] };
        const res = await axiosPublic.post(image_hosting_api, imageFile, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        })
        if (res.data.success) {
            const menuItem = {
                name: data.name,
                category: data.category,
                price: parseFloat(data.price),
                recipe: data.recipe,
                image: res.data.data.display_url
            }
            const menuRes = await axiosSecure.post('/menu', menuItem);
            // console.log(menuRes.data)
            if (menuRes.data.insertedId) {
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Your work has been saved",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }
        // console.log(res.data)
    }
    return (
        <div>
            <SectionTitle
                heading="add an item"
                subHeading="what's new"
            ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* recipe name */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                        </div>
                        <input
                            type="text"
                            placeholder="Recipe Name"
                            {...register('name', { required: true })}
                            className="input input-bordered w-full " />
                    </label>
                    {/* category & price div */}
                    <div className="flex  gap-6">
                        {/* category */}
                        <div className="form-control w-full my-6">
                            <label htmlFor="" className="label">
                                <span className="label-text">Category</span>
                            </label>
                            <select defaultValue="default" {...register("category", { required: true })}
                                className="select select-bordered w-full ">
                                <option disabled value="default">Select a Category</option>
                                <option value="salad">Salad</option>
                                <option value="pizza">Pizza</option>
                                <option value="soup">Soup</option>
                                <option value="dessert">Dessert</option>
                                <option value="drinks">Drinks</option>
                            </select>
                        </div>
                        {/* price */}
                        <div className="form-control w-full my-6">
                            <div className="label">
                                <span className="label-text">Price</span>
                            </div>
                            <input
                                type="number"
                                placeholder="Price $$"
                                {...register('price', { required: true })}
                                className="input input-bordered w-full " />
                        </div>
                    </div>
                    {/* recipe details */}
                    <label className="form-control">
                        <div className="label">
                            <span className="label-text">Your bio</span>
                            <span className="label-text-alt">Alt label</span>
                        </div>
                        <textarea
                            {...register('recipe', { required: true })}
                            className="textarea textarea-bordered h-24"
                            placeholder="Bio">
                        </textarea>
                        <div className="label">
                            <span className="label-text-alt">Your bio</span>
                            <span className="label-text-alt">Alt label</span>
                        </div>
                    </label>
                    {/* file input */}
                    <div>
                        <input
                            {...register('image', { required: true })}
                            type="file"
                            className="file-input w-full max-w-xs" />
                    </div>
                    {/* submit */}
                    <button className="btn mt-2">Add Item <FaUtensils></FaUtensils></button>
                </form>
            </div>
        </div>
    );
};

export default AddItems;