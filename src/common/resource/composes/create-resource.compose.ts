import axios from 'axios';
import { useMessage } from 'naive-ui';
import { http } from 'src/common/http/http';
import { Ref, ref } from 'vue';

export function useCreateResource(url: string): {
  loading: Ref<boolean>;
  save: (payload: Record<string, any>) => void;
} {
  const loading = ref<boolean>(false);
  const message = useMessage();

  async function save(payload: Record<string, any>) {
    loading.value = true;

    try {
      await http({
        url,
        method: 'post',
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
