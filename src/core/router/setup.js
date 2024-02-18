import { createRouter, createWebHistory } from 'vue-router';
import { routes } from 'src/routes/index';

export function setupRouter(app) {
  app.use(
    createRouter({
      history: createWebHistory(),
      routes,
    }),
  );
}
