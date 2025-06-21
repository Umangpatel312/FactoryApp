// src/common/components/Router/PrivateOutlet.tsx
import { useAuth } from 'common/hooks/useAuth';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import LoaderSpinner from 'common/components/Loader/LoaderSpinner';
import RoleBasedRoute from './RoleBasedRoute';

interface PrivateOutletProps {
  allowedRoles?: string[];
}

const PrivateOutlet = ({ allowedRoles }: PrivateOutletProps = {}): JSX.Element => {
  const authContext = useAuth();
  const location = useLocation();

  // Show loading state while checking authentication
  if (authContext.isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoaderSpinner />
      </div>
    );
  }

  // Redirect to login if not authenticated
  if (!authContext.isAuthenticated) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }

  // If no roles are required, just render the outlet
  if (!allowedRoles || allowedRoles.length === 0) {
    return <Outlet />;
  }

  // Otherwise, check roles using RoleBasedRoute
  return (
    <RoleBasedRoute allowedRoles={allowedRoles}>
      <Outlet />
    </RoleBasedRoute>
  );
};

export default PrivateOutlet;