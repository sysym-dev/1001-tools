import { RouteRecordSingleView } from 'vue-router';

export const routes: RouteRecordSingleView[] = [
  {
    path: '/',
    name: 'dashboard',
    component: () => import('src/modules/dashboard/views/dashboard-page.vue'),
    meta: {
      embedded: false,
    },
  },
  {
    path: '/today',
    name: 'today',
    component: () => import('src/modules/todo/views/todo-today-page.vue'),
  },
  {
    path: '/late',
    name: 'late',
    component: () => import('src/modules/todo/views/todo-late-page.vue'),
  },
  {
    path: '/all',
    name: 'all',
    component: () => import('src/modules/todo/views/todo-all-page.vue'),
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import('src/modules/profile/views/profile-page.vue'),
  },
];
