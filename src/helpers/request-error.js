import { AxiosError } from 'axios';

export class RequestError {
  type;
  message;

  constructor(error) {
    if (error instanceof AxiosError) {
      this.type = 'Network Error';
      this.message = error.message;
    } else if (error instanceof Error) {
      this.type = 'Error';
      this.message = error.message;
    } else {
      this.type = 'Error';
      this.message = 'Something Error';
    }
  }
}
