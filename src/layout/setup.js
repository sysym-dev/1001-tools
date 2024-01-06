import { layouts } from './layouts';

export function setupLayout(app) {
  for (const layout of layouts) {
    app.component(layout.name, layout);
  }
}
