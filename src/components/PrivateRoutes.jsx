import { Navigate, Outlet } from 'react-router-dom';
import { useMe } from '../api/queries';
import { pageRoutes } from '../routes';

export const PrivateRoutes = () => {
  let { data, isLoading, isFetched, isError } = useMe();

  if (isLoading) return <div>Loading ...</div>;

  return data ? <Outlet /> : <Navigate to={pageRoutes.auth} />;
};
