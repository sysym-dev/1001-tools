export const routes = [
  {
    path: '/profile',
    name: 'profile',
    component: () => import('src/modules/profile/views/profile-page.vue'),
    meta: {
      layout: 'LayoutApp',
      title: 'Profile',
      requireAuth: true,
    },
  },
];
