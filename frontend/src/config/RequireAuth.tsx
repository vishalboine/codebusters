import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface AuthContextType {
  auth?: any;
}
interface RequireAuthProps {
  allowedRoles: number[];
}

const RequireAuth = (props: RequireAuthProps) => {
  const { allowedRoles } = props;
  const { auth } = useAuth() as AuthContextType;
  const location = useLocation();
  
  return (
    auth?.roles?.find((role: number) => allowedRoles.includes(role))
    ? <Outlet />
    : auth?.user
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth