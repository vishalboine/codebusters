import React, { useEffect, useState } from 'react'
import useRefreshToken from '../hooks/useRefreshToken';
import useAuth from '../hooks/useAuth';
import { Outlet } from 'react-router';

type Props = {}

const PersistLogin = (props: Props) => {
    const [isLoading, setisLoading] = useState(true);
    const refresh = useRefreshToken();
    const { auth, persist } = useAuth();

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch(err) {
                console.log(err);
            } finally {
                setisLoading(false)
            }
        }

        !auth?.accessToken ? verifyRefreshToken() : setisLoading(false);
    },[])

  return (
    <>
        {!persist ? <Outlet /> : isLoading ? <p>...Loading</p> : <Outlet />}
    </>
  )
}

export default PersistLogin