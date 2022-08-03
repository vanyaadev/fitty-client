import { apiRoutes } from '../routes';
import { api } from '../utils/api';
import { useFetch } from '../utils/reactQuery';

export const getTokenByPassword = (email, password) =>
  api.get(apiRoutes.login, {
    email,
    password,
  });

export const useMe = () => {
  const context = useFetch(apiRoutes.me, undefined, { retry: false });
  return {
    ...context,
    data: context.data?.name,
  };
};
