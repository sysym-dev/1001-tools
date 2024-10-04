import packagae from 'root/package.json';

export function useConfig(app) {
  app.provide('config', {
    app: {
      title: import.meta.env.VITE_APP_TITLE,
      title2: import.meta.env.VITE_APP_TITLE2,
      author: import.meta.env.VITE_APP_AUTHOR,
      description: import.meta.env.VITE_APP_DESCRIPTION,
      url: import.meta.env.VITE_APP_URL,
      keywords: import.meta.env.VITE_APP_KEYWORDS,
    },
    githubUrl: packagae.repository,
  });
}
