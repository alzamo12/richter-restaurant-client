import axios from "axios";
import { useContext } from "react";
import { MdErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router";
import { AuthContext } from "../providers/AuthProvider";

const axiosSecure = axios.create({
  baseURL: 'http://localhost:5000'
})
const useAxiosSecure = () => {
  const { logOut } = useContext(AuthContext);
  const navigate = useNavigate();

  axiosSecure.interceptors.request.use(function (config) {
    const token = localStorage.getItem('access-token')
    console.log('request stopped by interceptors', token)
    config.headers.authorization = `Bearer ${token}`;
    return config;
  }, function (error) {
    return Promise.reject(error)
  })

  // add a response interceptor
  axiosSecure.interceptors.response.use(function (response) {
    // console.log(response)
    return response
  }, 
  // it will throw an error if the token is invalid
  async(error) => {
    const status = error.response.status;
    if (status === 401 || status === 403) {
     await logOut();
     navigate('/login')
    }
    return Promise.reject(error)
  })
  return axiosSecure
};

export default useAxiosSecure;