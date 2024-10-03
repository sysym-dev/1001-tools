export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: import.meta.env.VITE_APP_TITLE2,
      description: import.meta.env.VITE_APP_DESCRIPTION,
      keywords: 'tools, web tools, developer tools',
      withHeader: false,
    },
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/json',
    name: 'json',
    meta: {
      title: 'JSON Tools - Free Online JSON Converters and Validators',
      description:
        'Find the best free online JSON tools at 1001 Tools. Convert, validate, format, and manipulate JSON data easily with our comprehensive set of tools for developers and data handling.',
      keywords: 'json, json tools, json converter, json beautify, json minify',
      withHeader: false,
    },
    component: () => import('./pages/tools.vue'),
  },
  {
    path: '/json-to-toml',
    name: 'json-to-toml',
    meta: {
      title: 'JSON to TOML',
      description:
        'Easily convert JSON to TOML with our free online converter. Fast, accurate, and simple to use, perfect for developers and data format conversions in seconds.',
      keywords: 'json to toml, json, toml, convert',
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
];
