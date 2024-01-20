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

export { http };
