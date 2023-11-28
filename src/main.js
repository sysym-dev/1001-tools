import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutsideEvent } from './plugins/click-outside-event';
import { setupRouter } from './router/setup';

const app = createApp(App);

useClickOutsideEvent(app);

setupRouter(app);

app.mount('#app');
