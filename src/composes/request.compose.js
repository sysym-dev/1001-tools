import { ref } from 'vue';
import { http } from 'src/helpers/http';
import { RequestError } from '../helpers/request-error';

export function useRequest(url, options = {}) {
  const isLoading = ref(false);
  const isError = ref(false);
  const error = ref();

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
  }

  async function request() {
    try {
      startLoading();

      await http({
        url,
        method: options.method ?? 'get',
      });
    } catch (err) {
      isError.value = true;
      error.value = new RequestError(err);

      throw err;
    } finally {
      stopLoading();
    }
  }

  return { error, isLoading, isError, request };
}
