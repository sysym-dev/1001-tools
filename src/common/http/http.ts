import axios from 'axios';

export interface HttpResponse<T> {
  data: T;
}

export const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});
