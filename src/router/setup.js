import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export function setupRouter(app) {
  const router = createRouter({
    routes,
    history: createWebHistory(),
  });

  app.use(router);
}
