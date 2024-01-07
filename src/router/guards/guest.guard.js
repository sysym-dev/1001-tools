import { useAuthStore } from 'src/modules/auth/auth.store';

export function useGuestGuard(router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (
      authStore.isLoggedIn &&
      to.matched.some((route) => route.meta.requireGuest)
    ) {
      return { name: 'home' };
    }
  });
}
