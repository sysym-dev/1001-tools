import axios from 'axios';
import { useAuthStore } from 'src/features/auth/auth.store';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    await authStore.refreshToken();

    config.headers.Authorization = authStore.token.accessToken;
  }

  return config;
});

http.interceptors.response.use(
  (res) => res,
  async (err) => {
    const authStore = useAuthStore();

    if (err.response.status === 401) {
      await authStore.logout({
        redirect: true,
      });
    }

    return Promise.reject(err);
  },
);

export { http };
