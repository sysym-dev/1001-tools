import { createApp } from 'vue';
import './style.css';
import 'floating-vue/dist/style.css';
import App from './App.vue';
import { useRouter } from './plugins/router';
import { routes } from './routes';
import { useTooltip } from './plugins/tooltip';

const app = createApp(App);

useRouter(app, routes);
useTooltip(app);

app.mount('#app');
