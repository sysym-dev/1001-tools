import { createApp } from 'vue';
import './style.css';
import 'floating-vue/dist/style.css';
import App from './App.vue';
import { useRouter } from './plugins/router';
import { routes } from './routes';
import { useTooltip } from './plugins/tooltip';
import { useConfig } from './plugins/config';

const app = createApp(App);

useConfig(app);
useRouter(app, routes);
useTooltip(app);

app.mount('#app');
