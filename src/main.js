import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { useClickOutsideEvent } from './plugins/click-outside-event';

const app = createApp(App);

useClickOutsideEvent(app);

app.mount('#app');
