export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: 'Free Online Tools for Everyday Tasks',
      description:
        'Discover 1001 Tools, offering a wide range of free online tools to simplify your daily tasks. Find calculators, converters, measurement tools, and more, all in one place',
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
      description:
        'Easily convert JSON to TOML with our free online converter. Fast, accurate, and simple to use, perfect for developers and data format conversions in seconds.',
      keywords: ['json to toml', 'json', 'toml', 'convert'],
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
];
