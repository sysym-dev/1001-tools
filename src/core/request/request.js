import axios from 'axios';
import { RequestError } from './request.error';

export async function request(url, options = {}) {
  try {
    const res = await axios({
      url,
      method: options.method ?? 'get',
      ...options,
    });

    return res.data;
  } catch (err) {
    throw new RequestError(err);
  }
}
