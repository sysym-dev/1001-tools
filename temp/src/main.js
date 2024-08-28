import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutsideEvent } from './core/plugins/click-outside-event';
import { useProgressBar } from './core/plugins/progress-bar';
import { useEmitter } from './core/plugins/emitter';
import { setupRouter } from './core/router/setup';
import { setupLayout } from './core/layout/setup';
import { setupStore } from './core/store/setup';

import LayoutApp from 'src/features/app/components/app-layout.vue';
import LayoutAuth from 'src/features/auth/components/auth-layout.vue';

import { routes } from './router/routes';
import { guards } from './router/guards';

const app = createApp(App);

useClickOutsideEvent(app);
useProgressBar(app);
useEmitter(app);

setupLayout(app, [LayoutApp, LayoutAuth]);
setupStore(app);
setupRouter(app, { routes, guards });

app.mount('#app');
