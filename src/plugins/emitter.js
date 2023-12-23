import mitt from 'mitt';

export function useEmitter(app) {
  const emitter = mitt();

  app.provide('emitter', emitter);
}
