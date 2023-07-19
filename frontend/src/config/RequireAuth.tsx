import { useLocation, Navigate, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

interface AuthContextType {
  auth?: any;
}
interface RequireAuthProps {
  allowedRoles: string[];
}

const RequireAuth = (props: RequireAuthProps) => {
  const { allowedRoles } = props;
  const { auth } = useAuth() as AuthContextType;
  const location = useLocation();
  
  return (
    allowedRoles.find((role: string) => role === auth?.role)
    ? <Outlet />
    : auth?.user
        ? <Navigate to='/unauthorized' state={{ from: location }} replace />
        : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth