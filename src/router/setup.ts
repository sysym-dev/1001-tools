import { App } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';

export function setupRouter(app: App) {
  app.use(
    createRouter({
      history: createWebHistory(),
      routes,
    }),
  );
}
