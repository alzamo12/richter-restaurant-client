import useAxiosPublic from "../hooks/useAxiosPublic";

const ItemLoader = async ({params}) => {
    const axiosPublic = useAxiosPublic();
    const {id} = params;
    const res = await axiosPublic.get(`/menu/${id}`);
    return res.data
};

export default ItemLoader;