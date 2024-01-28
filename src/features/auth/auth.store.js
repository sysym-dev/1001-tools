import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import { createDate } from 'src/core/utils/date';
import { useRouter } from 'vue-router';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const router = useRouter();

    const isLoggedIn = ref(false);
    const token = reactive({
      accessToken: null,
      refreshToken: null,
    });
    const me = ref({});

    function login(payload) {
      setToken(payload.token);
      setMe(payload.me);

      isLoggedIn.value = true;
    }

    function logout(options = {}) {
      isLoggedIn.value = false;

      token.accessToken = null;
      me.value = {};

      if (options.redirect) {
        router.push({ name: 'login' });
      }
    }

    function setToken(payload) {
      token.accessToken = payload.accessToken;
      token.refreshToken = payload.refreshToken;
    }

    function setMe(payload) {
      me.value = payload;
    }

    function checkAccessTokenExpiry() {
      const decodedToken = jwtDecode(token.accessToken);

      return createDate(decodedToken.exp * 1000).isBefore(new Date());
    }

    async function refreshToken() {
      try {
        if (!checkAccessTokenExpiry()) {
          return;
        }

        const baseURL = import.meta.env.VITE_API_URL;
        const res = await axios.post(`${baseURL}/refresh-token`, {
          token: token.refreshToken,
        });

        token.accessToken = res.data.data.accessToken;
      } catch (err) {
        logout();
        router.push({ name: 'login' });
      }
    }

    return {
      isLoggedIn,
      token,
      me,
      login,
      logout,
      setMe,
      checkAccessTokenExpiry,
      refreshToken,
    };
  },
  { persist: true },
);
