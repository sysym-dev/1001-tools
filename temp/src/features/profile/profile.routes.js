export const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('src/features/profile/views/profile-page.vue'),
    meta: {
      layout: 'LayoutApp',
      title: 'Profile',
      requireAuth: true,
    },
  },
];
