// src/common/components/Router/RoleBasedRoute.tsx
import { Navigate, useLocation } from 'react-router-dom';
import { useGetUseRoles } from 'common/api/useGetUseRoles';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';

interface RoleBasedRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

const RoleBasedRoute = ({ children, allowedRoles }: RoleBasedRouteProps) => {
  const location = useLocation();
  const { data: userRoles = [], isLoading } = useGetUseRoles();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  // If no roles are required, allow access
  if (!allowedRoles || allowedRoles.length === 0) {
    return <>{children}</>;
  }

  // Check if user has any of the required roles
  const hasRequiredRole = allowedRoles.some(role => 
    userRoles.includes(role)
  );

  if (!hasRequiredRole) {
    // Redirect to home if user doesn't have required role
    return <Navigate to="/" state={{ from: location, unauthorized: true }} replace />;
  }

  return <>{children}</>;
};

export default RoleBasedRoute;