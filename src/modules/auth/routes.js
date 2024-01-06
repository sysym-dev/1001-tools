export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/modules/auth/views/auth-login-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Login',
      requireGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('src/modules/auth/views/auth-register-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Register',
      requireGuest: true,
    },
  },
];
