import {
  LoadResourceCollectionParams,
  ResourceCollection,
} from 'src/common/resource/collection';
import { Todo } from '../todo.entity';
import { reactive, toRef } from 'vue';
import { HttpResponse, http } from 'src/common/http/http';

export function useTodoResourceCollection() {
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

  async function load(params?: LoadResourceCollectionParams) {
    const res = await http<HttpResponse<ResourceCollection<Todo>>>({
      url: '/todos',
      method: 'get',
      params,
    });

    collection.rows = res.data.data.rows;
    collection.meta = res.data.data.meta;
  }

  return {
    data: toRef(collection, 'rows'),
    meta: toRef(collection, 'meta'),
    load,
  };
}
