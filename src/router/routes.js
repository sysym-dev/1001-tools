export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/modules/home/views/home-page.vue'),
  },
];
