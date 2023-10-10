import { createApp } from 'vue';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/setup';

const app = createApp(App);

setupRouter(app);

app.mount('#app');
