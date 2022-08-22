import { api } from './api';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

export function fetcher({ queryKey, pageParam }) {
  const [url, params] = queryKey;

  return api
    .get(url, { params: { ...params, pageParam } })
    .then((res) => res.data);
}

export const useFetch = (url, params, config) => {
  const context = useQuery(
    [url, params],
    ({ queryKey }) => fetcher({ queryKey }),
    {
      enabled: !!url,
      ...config,
    }
  );

  return context;
};

export const useGenericMutation = (func, url, params) => {
  const queryClient = useQueryClient();

  return useMutation(func, {
    onSuccess: () => {
      queryClient.invalidateQueries([url, params]);
    },
  });
};
