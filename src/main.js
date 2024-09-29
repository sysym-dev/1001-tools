import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useRouter } from './plugins/router';
import { routes } from './routes';

const app = createApp(App);

useRouter(app, routes);

app.mount('#app');
