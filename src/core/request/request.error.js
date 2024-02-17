export class RequestError {
  message;

  constructor(error) {
    if (error?.response?.data) {
      this.message = error.response.data.message;
    } else if (error instanceof Error) {
      this.message = error.message;
    }
  }
}
