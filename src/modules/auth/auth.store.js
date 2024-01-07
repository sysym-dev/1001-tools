import { defineStore } from 'pinia';
import { ref } from 'vue';
import { jwtDecode } from 'jwt-decode';
import { createDate } from 'src/utils/date';

export const useAuthStore = defineStore(
  'auth',
  () => {
    const isLoggedIn = ref(false);
    const accessToken = ref(null);
    const me = ref(null);

    function login(payload) {
      accessToken.value = payload.accessToken;
      me.value = payload.me;

      isLoggedIn.value = true;
    }

    function logout() {
      accessToken.value = null;
      me.value = null;

      isLoggedIn.value = false;
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
      checkAccessTokenExpiry,
    };
  },
  { persist: true },
);
