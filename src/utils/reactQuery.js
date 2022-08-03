import { api } from './api';
import { useQuery } from 'react-query';

export function fetcher({ queryKey, pageParam }) {
  const [url, params] = queryKey;

  return api
    .get(url, { params: { ...params, pageParam } })
    .then(res => res.data);
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
