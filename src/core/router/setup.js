import { createRouter, createWebHistory } from 'vue-router';

export function setupRouter(app, routes) {
  app.use(
    createRouter({
      history: createWebHistory(),
      routes,
    }),
  );
}
