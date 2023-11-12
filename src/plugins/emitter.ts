import mitt from 'mitt';
import { App } from 'vue';

export function useEmitter(app: App) {
  app.provide('emitter', mitt());
}
