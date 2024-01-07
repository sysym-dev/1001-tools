import { AxiosError } from 'axios';

export class RequestError {
  type;
  message;
  data;

  constructor(error) {
    if (error instanceof AxiosError) {
      this.type = 'Network Error';
      this.message = error.message;
      this.data = error.response;
    } else if (error instanceof Error) {
      this.type = 'Error';
      this.message = error.message;
    } else {
      this.type = 'Error';
      this.message = 'Something Error';
    }
  }
}
