export function setupLayout(app, layouts) {
  for (const layout of layouts) {
    app.component(layout.name, layout);
  }
}
