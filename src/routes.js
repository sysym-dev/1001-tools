export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: import.meta.env.VITE_APP_TITLE,
      description: import.meta.env.VITE_APP_DESCRIPTION,
      keywords: ['tools', 'web tools', 'developer tools'],
      withHeader: false,
    },
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/json-to-toml',
    name: 'json-to-toml',
    meta: {
      title: 'JSON to TOML',
      description: 'Convert from JSON to TOML',
      keywords: ['json to toml', 'json', 'toml', 'convert'],
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
];
