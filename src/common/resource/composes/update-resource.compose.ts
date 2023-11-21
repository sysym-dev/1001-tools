import axios from 'axios';
import { useMessage } from 'naive-ui';
import { http } from 'src/common/http/http';
import { ref } from 'vue';

export function useUpdateResource<T>(url: string) {
  const loading = ref<boolean>(false);
  const message = useMessage();

  async function save(id: number, payload: Partial<T>) {
    loading.value = true;

    try {
      await http({
        url: `${url}/${id}`,
        method: 'patch',
        data: payload,
      });
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.message);
      }

      throw err;
    } finally {
      loading.value = false;
    }
  }

  return { loading, save };
}
