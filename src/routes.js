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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('./pages/404.vue'),
    meta: {
      title: '404 Not Found',
      description: 'The requested page is not found',
      keywords: '404, not found',
    },
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
      withBreadcrumbs: true,
    },
    component: () => import('./pages/json.vue'),
  },
  {
    path: '/toml',
    name: 'toml',
    meta: {
      title: 'Free Online Tools for TOML',
      description:
        'Discover various free online TOML tools at 1001 Tools. Easily convert, edit, format, and validate TOML data with a range of simple and effective tools.',
      keywords: 'toml, toml tools, toml converter, toml beautify, toml minify',
      breadcrumbTitle: 'TOML',
      withBreadcrumbs: true,
    },
    component: () => import('./pages/toml.vue'),
  },
  {
    path: '/qr',
    name: 'qr',
    meta: {
      title: 'Free Online Tools for QR',
      description:
        'Explore our collection of QR tools to generate, scan, and customize QR Codes. Access free and easy-to-use tools designed for all your QR code needs.',
      keywords: 'qr tools, qr code generator, qr scanner, create qr code',
      breadcrumbTitle: 'QR',
      withBreadcrumbs: true,
    },
    component: () => import('./pages/qr.vue'),
  },
  {
    path: '/date-and-time',
    name: 'date-and-time',
    meta: {
      title: 'Free Online Tools for QR',
      description:
        'Explore our collection of QR tools to generate, scan, and customize QR Codes. Access free and easy-to-use tools designed for all your QR code needs.',
      keywords: 'qr tools, qr code generator, qr scanner, create qr code',
      breadcrumbTitle: 'QR',
      withBreadcrumbs: true,
    },
    component: () => import('./pages/date-and-time.vue'),
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
      withBreadcrumbs: true,
    },
    component: () => import('./tools/json-to-toml/index.vue'),
  },
  {
    path: '/toml-to-json',
    name: 'toml-to-json',
    meta: {
      title: 'TOML to JSON Converter',
      description:
        'Easily convert TOML to JSON with our free online converter. Fast, accurate, and simple to use, perfect for developers and data format conversions in seconds.',
      keywords: 'toml to json, toml, json, convert',
      breadcrumbs: [{ id: 'toml', name: 'TOML' }],
      breadcrumbTitle: 'TOML to JSON',
      headingTitle: 'TOML to JSON',
      withBreadcrumbs: true,
    },
    component: () => import('./tools/toml-to-json/index.vue'),
  },
  {
    path: '/qr-scanner',
    name: 'qr-scanner',
    meta: {
      title: 'Scan QR Code',
      description:
        "Use our online QR Code scanner to quickly and securely scan codes or upload images. No additional apps needed—just use your device's camera or upload a QR image to start scanning now!",
      keywords:
        'qr code scanner, online qr code scanner, scan qr code camera, scan qr code image',
      breadcrumbs: [{ id: 'qr', name: 'QR' }],
      breadcrumbTitle: 'QR Code Scanner',
      headingTitle: 'Scan QR Code',
      withBreadcrumbs: true,
    },
    component: () => import('./tools/qr-scanner/index.vue'),
  },
  {
    path: '/qr-generator',
    name: 'qr-generator',
    meta: {
      title: 'Generate QR Code',
      description:
        'Generate QR codes instantly with our online QR code generator. Customize and download your QR code in just a few clicks—no additional software required!',
      keywords:
        'qr code generator, online qr code generator, create qr code, qr code maker',
      breadcrumbs: [{ id: 'qr', name: 'QR' }],
      breadcrumbTitle: 'QR Code Generator',
      headingTitle: 'Generate QR Code',
      withBreadcrumbs: true,
    },
    component: () => import('./tools/qr-generator/index.vue'),
  },
  {
    path: '/timer',
    name: 'timer',
    meta: {
      title: 'Timer',
      description:
        'Use our online timer to easily count down time for any purpose. Perfect for daily activities, workouts, cooking, and more.',
      keywords:
        'online timer, countdown timer, stopwatch, time tracker, time management tool',
      breadcrumbs: [{ id: 'date-and-time', name: 'Date and Time' }],
      breadcrumbTitle: 'Timer',
      headingTitle: 'Timer',
      withBreadcrumbs: true,
    },
    component: () => import('./tools/timer/index.vue'),
  },
];
