import { defineStore } from 'pinia';
import { ref } from 'vue';

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

    return { isLoggedIn, login };
  },
  { persist: true },
);
