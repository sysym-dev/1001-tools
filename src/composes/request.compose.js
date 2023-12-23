import { ref } from 'vue';
import { http } from 'src/helpers/http';
import { RequestError } from '../helpers/request-error';

export function useRequest(url, options = {}) {
  const isLoading = ref(false);
  const isError = ref(false);
  const error = ref();
  const data = ref();

  function startLoading() {
    isLoading.value = true;
  }

  function stopLoading() {
    isLoading.value = false;
  }

  function resetError() {
    isError.value = false;
    error.value = null;
  }

  async function request(config) {
    try {
      startLoading();
      resetError();

      const res = await http({
        url,
        method: options.method ?? 'get',
        ...config,
      });

      data.value = res.data;
    } catch (err) {
      isError.value = true;
      error.value = new RequestError(err);

      throw err;
    } finally {
      stopLoading();
    }
  }

  return { data, error, isLoading, isError, request, resetError };
}
