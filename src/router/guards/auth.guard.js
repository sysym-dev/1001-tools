import { useAuthStore } from 'src/modules/auth/auth.store';

export function useAuthGuard(router) {
  router.beforeEach((to) => {
    const authStore = useAuthStore();

    if (
      !authStore.isLoggedIn &&
      to.matched.some((route) => route.meta.requireAuth)
    ) {
      return { name: 'login' };
    }
  });
}
