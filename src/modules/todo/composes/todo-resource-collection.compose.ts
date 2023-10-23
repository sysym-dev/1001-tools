import {
  LoadResourceCollectionOptions,
  LoadResourceCollectionParams,
  ResourceCollection,
} from 'src/common/resource/collection';
import { Todo } from '../todo.entity';
import { Ref, reactive, ref, toRef } from 'vue';
import { HttpResponse, http } from 'src/common/http/http';
import { useMessage } from 'naive-ui';
import axios from 'axios';

export function useTodoResourceCollection(
  params?: Ref<LoadResourceCollectionParams>,
) {
  const message = useMessage();

  const loading = ref(false);
  const collection = reactive<ResourceCollection<Todo>>({
    meta: {
      page: {
        number: 1,
        size: 10,
      },
      total: 0,
    },
    rows: [],
  });

  async function load(options?: LoadResourceCollectionOptions) {
    loading.value = true;

    if (options?.resetPage && params?.value.page) {
      params.value.page.number = 1;
    }

    try {
      const res = await http<HttpResponse<ResourceCollection<Todo>>>({
        url: '/todos',
        method: 'get',
        params: params?.value,
      });

      collection.rows = res.data.data.rows;
      collection.meta = res.data.data.meta;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.message);
      }
    } finally {
      loading.value = false;
    }
  }

  return {
    data: toRef(collection, 'rows'),
    meta: toRef(collection, 'meta'),
    loading,
    load,
  };
}
