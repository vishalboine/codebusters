import useAuth from "./useAuth";
import axios from '../config/axiosInstance';

const useRefreshToken = () => {

    const { setAuth } = useAuth();

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        });
        
        setAuth((prev: any) => {
            console.log(JSON.stringify(prev));
            console.log(response.data.accessToken);
            return { ...prev,
                role: response.data.role,
                accessToken: response.data.accessToken
            }
        })
    }

  return refresh;
}

export default useRefreshToken