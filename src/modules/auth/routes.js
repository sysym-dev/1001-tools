export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/modules/auth/views/auth-login-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Login',
    },
  },
];
