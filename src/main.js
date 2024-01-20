import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutsideEvent } from './core/plugins/click-outside-event';
import { useProgressBar } from './core/plugins/progress-bar';
import { useEmitter } from './core/plugins/emitter';
import { setupRouter } from './router/setup';
import { setupLayout } from './core/layout/setup';
import { setupStore } from './store/setup';

import LayoutApp from 'src/features/app/components/app-layout.vue';
import LayoutAuth from 'src/features/auth/components/auth-layout.vue';

const app = createApp(App);

useClickOutsideEvent(app);
useProgressBar(app);
useEmitter(app);

setupLayout(app, [LayoutApp, LayoutAuth]);
setupStore(app);
setupRouter(app);

app.mount('#app');
