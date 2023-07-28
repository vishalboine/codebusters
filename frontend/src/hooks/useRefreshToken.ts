import axiosInstance from '../config/axiosInstance';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosInstance.get('/refresh', {
            withCredentials: true
        });
        
        setAuth((prev:any) => {
            return {
                ...prev,
                role: response.data.role,
                accessToken: response.data.accessToken,
                user: response.data.user,
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;