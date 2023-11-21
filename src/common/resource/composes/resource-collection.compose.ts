import {
  LoadResourceCollectionOptions,
  LoadResourceCollectionParams,
  ResourceCollection,
} from 'src/common/resource/collection';
import { Ref, ref, toRef } from 'vue';
import { HttpResponse, http } from 'src/common/http/http';
import { useMessage } from 'naive-ui';
import axios from 'axios';
import { Entity } from '../entity';

export function useResourceCollection<T extends Entity>(
  url: string,
  params?: Ref<LoadResourceCollectionParams>,
) {
  const message = useMessage();

  const loading = ref(false);
  const collection = ref<ResourceCollection<T>>({
    meta: {
      page: {
        number: 1,
        size: 10,
      },
      total: 0,
    },
    rows: [],
  }) as Ref<ResourceCollection<T>>;

  async function load(options?: LoadResourceCollectionOptions) {
    loading.value = true;

    if (options?.resetPage && params?.value.page) {
      params.value.page.number = 1;
    }

    try {
      const res = await http<HttpResponse<ResourceCollection<T>>>({
        url,
        method: 'get',
        params: params?.value,
      });

      collection.value.rows = res.data.data.rows;
      collection.value.meta = res.data.data.meta;
    } catch (err) {
      if (axios.isAxiosError(err)) {
        message.error(err.message);
      }

      throw err;
    } finally {
      loading.value = false;
    }
  }

  return {
    data: toRef(collection.value, 'rows'),
    meta: toRef(collection.value, 'meta'),
    loading,
    load,
  };
}
