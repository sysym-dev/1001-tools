export const routes = [
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
            'src/features/task-category/views/task-category-index-page.vue'
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
            'src/features/task-category/views/task-category-detail-page.vue'
          ),
        meta: {
          title: 'Category Detail',
          layout: 'LayoutApp',
        },
      },
    ],
  },
];
