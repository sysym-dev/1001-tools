import { createApp } from 'vue';
import 'vfonts/Lato.css';
import 'vfonts/FiraCode.css';
import './style.css';
import App from './App.vue';
import { setupRouter } from './router/setup';
import { useEmitter } from './plugins/emitter';

const app = createApp(App);

setupRouter(app);
useEmitter(app);

app.mount('#app');
