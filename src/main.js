import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { setupRouter } from 'src/core/router/setup';

const app = createApp(App);

setupRouter(app);

app.mount('#app');

export { app };
