import { apiRoutes } from '../routes';
import { api } from '../utils/api';
import { useFetch } from '../utils/reactQuery';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getRandomColor } from '../utils/helpers';

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
    select: (res) =>
      res.map((item) => ({
        ...item,
        title: item.name,
        startDate: new Date(item.startDate),
        endDate: new Date(item.endDate),
      })),
  });
};

export const useInstructors = () => {
  return useFetch(apiRoutes.instructors, undefined, {
    select: (res) =>
      res.map((instructor) => ({
        id: instructor.id,
        text: `${instructor.name}  ${instructor.surname}`,
        color: getRandomColor(),
      })),
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

export const useEnroll = () => {
  const queryClient = useQueryClient();
  return useMutation((data) => api.post(`${apiRoutes.enroll + data.userId}`), {
    onSuccess: () => {
      queryClient.invalidateQueries([apiRoutes.enroll]);
    },
  });
};
