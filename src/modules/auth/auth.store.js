import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { createDate } from 'src/utils/date';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false);
    const accessToken = ref(null);
    const me = ref({});

    function login(payload) {
      accessToken.value = payload.accessToken;

      setMe(payload.me);

      isLoggedIn.value = true;
    }

    function logout() {
      isLoggedIn.value = false;

      accessToken.value = null;
      me.value = {};
    }

    function setMe(payload) {
      me.value = payload;
    }

    function checkAccessTokenExpiry() {
      const decodedToken = jwtDecode(accessToken.value);

      return createDate(decodedToken.exp * 1000).isBefore(new Date());
    }

    return {
      isLoggedIn,
      accessToken,
      me,
      login,
      logout,
      setMe,
      checkAccessTokenExpiry,
    };
  },
  { persist: true },
);
