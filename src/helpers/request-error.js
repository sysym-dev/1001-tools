import { AxiosError } from 'axios';

export class RequestError {
  type;
  message;

  constructor(error) {
    if (error instanceof AxiosError) {
      this.type = 'Network Error';

      if (error.response.status === 422) {
        this.message = Object.values(error.response.data.details)[0];
      } else {
        this.message = error.message;
      }
    } else if (error instanceof Error) {
      this.type = 'Error';
      this.message = error.message;
    } else {
      this.type = 'Error';
      this.message = 'Something Error';
    }
  }
}
