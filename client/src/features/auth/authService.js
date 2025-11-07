import axios from "axios";
import { toast } from "react-toastify";

const API_URL = `${process.env.REACT_APP_SERVER_URL}/api/auth`;

// Register User
const register = async (userData) => {
    const response = await axios.post(API_URL + "/register", userData);

    if (response.data) {
        toast.success("Registered Successfully!");
    }

    return response.data;
};

// Login User
const login = async (userData) => {
    const response = await axios.post(API_URL + "/login", userData);

    if (response.data) {
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success("Logged In Successfully!");
    }

    return response.data;
};

// Logout User
const logout = async () => {
    localStorage.removeItem("user");
};

const authService = {
    register,
    login,
    logout,
};

export default authService;