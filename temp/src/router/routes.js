import { routes as authRoutes } from 'src/features/auth/auth.routes';
import { routes as profileRoutes } from 'src/features/profile/profile.routes';
import { routes as taskRoutes } from 'src/features/task/task.routes';
import { routes as taskCategoryRoutes } from 'src/features/task-category/task-category.routes';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/views/home-page.vue'),
    meta: {
      title: 'Home',
      layout: 'LayoutApp',
      requireAuth: true,
    },
  },
  ...taskCategoryRoutes,
  ...taskRoutes,
  ...profileRoutes,
  ...authRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('src/views/not-found-page.vue'),
    meta: {
      title: 'Not Found',
    },
  },
];
