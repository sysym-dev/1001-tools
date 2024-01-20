import { routes as authRoutes } from 'src/features/auth/auth.routes';
import { routes as profileRoutes } from 'src/modules/profile/routes';

export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/modules/home/views/home-page.vue'),
    meta: {
      title: 'Home',
      layout: 'LayoutApp',
      requireAuth: true,
    },
  },
  {
    path: '/task-categories/',
    name: 'task-categories',
    meta: {
      requireAuth: true,
    },
    children: [
      {
        path: '',
        name: 'task-categories.index',
        component: () =>
          import(
            'src/modules/task-category/views/task-category-index-page.vue'
          ),
        meta: {
          title: 'Categories',
          layout: 'LayoutApp',
        },
      },
      {
        path: ':id',
        name: 'task-categories.detail',
        component: () =>
          import(
            'src/modules/task-category/views/task-category-detail-page.vue'
          ),
        meta: {
          title: 'Category Detail',
          layout: 'LayoutApp',
        },
      },
    ],
  },
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
        component: () => import('src/modules/task/views/task-index-page.vue'),
        meta: {
          title: 'Tasks',
          layout: 'LayoutApp',
        },
      },
    ],
  },
  ...profileRoutes,
  ...authRoutes,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('src/modules/not-found/views/not-found-page.vue'),
    meta: {
      title: 'Not Found',
      layout: 'LayoutApp',
    },
  },
];
