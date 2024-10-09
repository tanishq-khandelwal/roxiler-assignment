import axios from "axios";

const LOCAL_URL="http://localhost:3000/api/v1";
const PROD_URL="https://roxiler-assignment-lz2q.onrender.com/api/v1"
const axiosInstance=axios.create();

axiosInstance.defaults.baseURL=PROD_URL;
axiosInstance.defaults.withCredentials=true;


export default axiosInstance;