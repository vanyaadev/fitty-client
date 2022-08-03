import axios from 'axios';
import Cookies from 'js-cookie';

const BASE_URL = 'http://localhost:4000';

const instance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  validateStatus: status => status >= 200 && status < 300,
});

export const api = {
  get: (url, params) => instance.get(url),
  post: (url, data) => instance.post(url, data),
  patch: (url, data) => instance.patch(url, data),
  delete: url => instance.delete(url),
};
