import { RouteRecordSingleView } from 'vue-router';

export const routes: RouteRecordSingleView[] = [
  {
    path: '/',
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
];
