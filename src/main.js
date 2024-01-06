import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutsideEvent } from './plugins/click-outside-event';
import { useProgressBar } from './plugins/progress-bar';
import { useEmitter } from './plugins/emitter';
import { setupRouter } from './router/setup';
import { setupLayout } from './layout/setup';
import { setupStore } from './store/setup';

const app = createApp(App);

useClickOutsideEvent(app);
useProgressBar(app);
useEmitter(app);

setupLayout(app);
setupStore(app);
setupRouter(app);

app.mount('#app');
