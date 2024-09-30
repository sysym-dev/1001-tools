export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: '1001 Tools',
      withHeader: false,
    },
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/json-to-toml',
    name: 'json-to-toml',
    meta: {
      title: 'JSON to TOML',
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
];
