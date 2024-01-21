export const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('src/features/auth/views/auth-login-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Login',
      requireGuest: true,
    },
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('src/features/auth/views/auth-register-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Register',
      requireGuest: true,
    },
  },
  {
    path: '/forgot-password',
    name: 'forgot-password',
    component: () =>
      import('src/features/auth/views/auth-forgot-password-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Forgot Password',
      requireGuest: true,
    },
  },
  {
    path: '/reset-password',
    name: 'reset-password',
    component: () =>
      import('src/features/auth/views/auth-reset-password-page.vue'),
    meta: {
      layout: 'LayoutAuth',
      title: 'Reset Password',
      requireGuest: true,
    },
  },
];
