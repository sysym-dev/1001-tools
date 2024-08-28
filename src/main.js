import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from 'src/core/router/setup';
import { routes } from 'src/routes/index';
import { setupStore } from 'src/core/store/setup';

const app = createApp(App);

setupRouter(app, routes);
setupStore(app);

app.mount('#app');

export { app };
