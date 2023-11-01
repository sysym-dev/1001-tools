export function debounce(func: Function, wait: number = 500) {
  let timeout: number;

  return (...args: any[]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => func(args), wait);
  };
}
