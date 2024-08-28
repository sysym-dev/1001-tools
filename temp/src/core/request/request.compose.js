import { ref } from 'vue';
import { http } from 'src/core/common/http';
import { RequestError } from './request.error';

export function useRequest(url, options = {}) {
  const isLoading = ref(false);
  const isError = ref(false);
  const error = ref();
  const data = ref({ ...options.initData });

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
        headers: {
          'Content-Type': options.multipart
            ? 'multipart/form-data'
            : 'application/json',
        },
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
