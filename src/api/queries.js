import { apiRoutes } from '../routes';
import { api } from '../utils/api';
import { useFetch } from '../utils/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export const getTokenByPassword = (email, password) =>
  api.get(apiRoutes.login, {
    email,
    password,
  });

export const logout = () => {
  return api.post(apiRoutes.logout);
};

export const useMe = () => {
  return useFetch(apiRoutes.me, undefined, { retry: false });
};

export const useClasses = () => {
  return useFetch(apiRoutes.classes, undefined, {
    select: (res) => res.map((item) => ({ ...item, title: item.name })),
  });
};

export const usePostClasses = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => api.post(apiRoutes.classes, data), {
    onSuccess: () => {
      queryClient.invalidateQueries([apiRoutes.classes]);
    },
  });
};
