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
        name: 'task-categories.show',
        component: () =>
          import('src/modules/task-category/views/task-category-detail.vue'),
      },
    ],
  },
];
