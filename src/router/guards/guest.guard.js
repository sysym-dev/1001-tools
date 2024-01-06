import { useAuthStore } from 'src/modules/auth/auth.store';

export function useGuestGuard(router) {
  const authStore = useAuthStore();

  router.beforeEach((to) => {
    if (
      authStore.isLoggedIn &&
      to.matched.some((route) => route.meta.requireGuest)
    ) {
      return { name: 'home' };
    }
  });
}
