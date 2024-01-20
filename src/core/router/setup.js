import { createRouter, createWebHistory } from 'vue-router';

export function setupRouter(app, options) {
  const router = createRouter({
    routes: options.routes,
    history: createWebHistory(),
  });

  for (const useGuard of options.guards) {
    useGuard(router);
  }

  app.use(router);
}
