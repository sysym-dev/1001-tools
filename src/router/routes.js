export const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('src/modules/home/views/home-page.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/task-categories/',
    name: 'task-categories',
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
        },
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
        component: () => import('src/modules/task/views/task-index-page.vue'),
        meta: {
          title: 'Tasks',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('src/modules/not-found/views/not-found-page.vue'),
    meta: {
      title: 'Not Found',
    },
  },
];
