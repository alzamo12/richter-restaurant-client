import axios from 'axios';

// const token = localStorage.getItem('access-token');
const axiosPublic = axios.create({
    // baseURL: "https://richter-restaurant-server-alzami12-al-zamis-projects.vercel.app",
    baseURL: 'http://localhost:5000',
    // baseURL: 'https://richter-restaurant-server.vercel.app',
})
const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;