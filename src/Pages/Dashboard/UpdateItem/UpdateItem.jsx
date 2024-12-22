import { useLoaderData } from "react-router";
import SectionTitle from "../../../components/SectionTitle/SectionTitle";
import { FaUtensils } from "react-icons/fa";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import Swal from "sweetalert2";

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
const UpdateItem = () => {
    const { register, handleSubmit } = useForm();
    const {name, category, recipe, price, _id} = useLoaderData();
    const axiosPublic = useAxiosPublic();
    // console.log(menuItem)
   const onSubmit = async (data) => {
           console.log(data);
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
               const menuRes = await axiosSecure.patch(`/menu/${_id}`, menuItem);
               console.log(menuRes.data)
               if (menuRes.data.modifiedCount) {
                   Swal.fire({
                       position: "top-end",
                       icon: "success",
                       title: "Your work has been saved",
                       showConfirmButton: false,
                       timer: 1500
                   });
               }
           }
           console.log(res.data)
       }
    return (
        <div>
            <SectionTitle
                subHeading="Refresh info"
                heading="Update an item"
            ></SectionTitle>
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    {/* recipe name */}
                    <label className="form-control w-full my-6">
                        <div className="label">
                            <span className="label-text">Recipe Name</span>
                        </div>
                        <input
                            defaultValue={name}
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
                            <select defaultValue={category} {...register("category", { required: true })}
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
                            defaultValue={price}
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
                        defaultValue={recipe}
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
                            {...register('image')}
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

export default UpdateItem;