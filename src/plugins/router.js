import { createRouter, createWebHistory } from 'vue-router';

export function useRouter(app, routes) {
  app.use(
    createRouter({
      routes,
      history: createWebHistory(),
    }),
  );
}
