import { useNavigate } from "react-router-dom";
import axiosInstance from "../config/axiosInstance";
import useAuth from "./useAuth";

const useLogout = () => {
    const { setAuth } = useAuth();
    const navigate = useNavigate()
    const logout = async () => {
        setAuth({});
        try {
            const response = await axiosInstance('/logout', {
                withCredentials: true
            });
            navigate('/login' , { replace: true })
        } catch (err) {
        }
    }

    return logout;
}

export default useLogout