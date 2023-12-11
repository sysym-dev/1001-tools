export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/modules/home/views/home-page.vue'),
  },
  {
    path: '/task-categories/',
    name: 'task-categories',
    children: [
      {
        path: '',
        name: 'task-categories.index',
        component: () =>
          import('src/modules/task-category/views/task-category-index.vue'),
      },
      {
        path: ':id',
        name: 'task-categories.detail',
        component: () =>
          import('src/modules/task-category/views/task-category-detail.vue'),
      },
    ],
  },
  {
    path: '/tasks/',
    name: 'tasks',
    children: [
      {
        path: '',
        name: 'tasks.index',
        component: () => import('src/modules/task/views/task-index.vue'),
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('src/modules/not-found/views/not-found-page.vue'),
  },
];
