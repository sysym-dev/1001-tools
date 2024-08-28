export function useTitle() {
  function setTitle(title) {
    document.title = `Task - ${title}`;
  }

  return { setTitle };
}
