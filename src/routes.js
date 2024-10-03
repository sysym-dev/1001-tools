export const routes = [
  {
    path: '/',
    name: 'index',
    meta: {
      title: import.meta.env.VITE_APP_TITLE2,
      description: import.meta.env.VITE_APP_DESCRIPTION,
      keywords: 'tools, web tools, developer tools',
      withHeader: false,
      withBreadcrumbs: false,
    },
    component: () => import('./pages/index.vue'),
  },
  {
    path: '/json',
    name: 'json',
    meta: {
      title: 'Free Online Tools for JSON',
      description:
        'Discover various free online JSON tools at 1001 Tools. Easily convert, edit, format, and validate JSON data with a range of simple and effective tools.',
      keywords: 'json, json tools, json converter, json beautify, json minify',
      breadcrumbTitle: 'JSON',
    },
    component: () => import('./pages/json.vue'),
  },
  {
    path: '/json-to-toml',
    name: 'json-to-toml',
    meta: {
      title: 'JSON to TOML Converter',
      description:
        'Easily convert JSON to TOML with our free online converter. Fast, accurate, and simple to use, perfect for developers and data format conversions in seconds.',
      keywords: 'json to toml, json, toml, convert',
      breadcrumbs: [{ id: 'json', name: 'JSON' }],
      breadcrumbTitle: 'JSON to TOML',
      headingTitle: 'JSON to TOML',
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
];
