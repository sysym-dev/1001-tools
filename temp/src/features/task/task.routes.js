import { routes as authRoutes } from 'src/features/auth/auth.routes';
import { routes as profileRoutes } from 'src/features/profile/profile.routes';

export const routes = [
  {
    path: '/tasks/',
    name: 'tasks',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'tasks.index',
        component: () => import('src/features/task/views/task-index-page.vue'),
        meta: {
          title: 'Tasks',
          layout: 'LayoutApp',
        },
      },
    ],
  },
];
