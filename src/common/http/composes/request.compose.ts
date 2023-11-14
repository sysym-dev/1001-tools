import { Ref, ref } from 'vue';
import { http } from '../http';

export function useRequest<T>(options: {
  method: string;
  url: string;
  transformResult?: (data: any) => T;
}): {
  loading: Ref<boolean>;
  res: Ref<T | undefined>;
  request: (params?: any) => Promise<T>;
} {
  const loading = ref<boolean>(false);
  const res = ref<T>();

  async function request(params?: any): Promise<T> {
    const httpRes = await http<T>({
      url: options.url,
      method: options.method,
      params,
    });

    res.value = options.transformResult
      ? options.transformResult(httpRes.data)
      : httpRes.data;

    return httpRes.data;
  }

  return {
    loading,
    res,
    request,
  };
}
