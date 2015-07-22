/*global __SERVER__*/
import fetch from 'node-fetch';

class ApiClient {
  constructor(req) {
    this.req = req;
  }

  fetch(url, options) {
    return fetch(url, options).then((res) => res.json());
  }
}

export default ApiClient;
