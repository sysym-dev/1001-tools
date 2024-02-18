import { createRouter, createWebHistory } from 'vue-router';

export function setupRouter(app) {
  app.use(
    createRouter({
      history: createWebHistory(),
      routes: [],
    }),
  );
}
