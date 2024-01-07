import axios from 'axios';
import { useAuthStore } from 'src/modules/auth/auth.store';
import { router } from '../router/router';

const http = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

http.interceptors.request.use(async (config) => {
  const authStore = useAuthStore();

  if (authStore.isLoggedIn) {
    if (authStore.checkAccessTokenExpiry()) {
      authStore.logout();
      router.push({ name: 'login' });
    }

    config.headers.Authorization = authStore.accessToken;
  }

  return config;
});

export { http };
