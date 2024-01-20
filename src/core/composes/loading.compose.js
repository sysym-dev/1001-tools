import { ref } from 'vue';

export function useLoading(config) {
  const loading = ref({
    type: config.initType,
    visible: config.initVisible,
  });

  function startLoading(type) {
    loading.value.type = type;
    loading.value.visible = true;
  }
  function stopLoading() {
    loading.value.type = null;
    loading.value.visible = false;
  }

  return { loading, startLoading, stopLoading };
}
