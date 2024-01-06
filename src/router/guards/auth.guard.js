import { useAuthStore } from 'src/modules/auth/auth.store';

export function useAuthGuard(router) {
  const authStore = useAuthStore();

  router.beforeEach((to) => {
    if (
      !authStore.isLoggedIn &&
      to.matched.some((route) => route.meta.requireAuth)
    ) {
      return { name: 'login' };
    }
  });
}
