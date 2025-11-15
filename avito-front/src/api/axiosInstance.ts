import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "/api/v1",
    headers: {
        "Content-Type": "application/json",
    },
    timeout: 10000,
    paramsSerializer: {
        indexes: null,
    }
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        console.error("API Error:", error);
        return Promise.reject(error);
    }
);

export default axiosInstance;
