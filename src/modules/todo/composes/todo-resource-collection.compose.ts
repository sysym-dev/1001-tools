import {
  LoadResourceCollectionParams,
  ResourceCollection,
} from 'src/common/resource/collection';
import { Todo } from '../todo.entity';
import { Ref, reactive, ref, toRef } from 'vue';
import { HttpResponse, http } from 'src/common/http/http';

export function useTodoResourceCollection(
  params?: Ref<LoadResourceCollectionParams>,
) {
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

  async function load() {
    loading.value = true;

    try {
      const res = await http<HttpResponse<ResourceCollection<Todo>>>({
        url: '/todos',
        method: 'get',
        params: params?.value,
      });

      collection.rows = res.data.data.rows;
      collection.meta = res.data.data.meta;
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
