import axiosInstance from '../config/axiosInstance';
import useAuth from './useAuth';

const useRefreshToken = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axiosInstance.get('/refresh', {
            withCredentials: true
        });
        console.log(response);
        
        setAuth((prev:any) => {
            return {
                ...prev,
                roles: response.data.roles,
                accessToken: response.data.accessToken
            }
        });
        return response.data.accessToken;
    }
    return refresh;
};

export default useRefreshToken;