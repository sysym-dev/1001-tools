import { RouteRecordSingleView } from 'vue-router';

export const routes: RouteRecordSingleView[] = [
  {
    path: '/',
    name: 'today',
    component: () => import('src/modules/todo/views/todo-today-page.vue'),
  },
];
