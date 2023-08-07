import { Outlet } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    const useIsMounted = () => {
        const isMounted = useRef(false);
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            }
            catch (err) {
            }
            finally {
                isMounted && setIsLoading(false);
            }
        }
        useEffect(() => {
          isMounted.current = true;
          !auth?.accessToken && persist ? verifyRefreshToken() : setIsLoading(false);
          return () => {
            isMounted.current = false;
          };
        }, []);
        return isMounted;
      };
    useIsMounted();

    return (
        <>
            {!persist
                ? <Outlet />
                : isLoading
                    ? <p>Loading...</p>
                    : <Outlet />
            }
        </>
    )
}

export default PersistLogin