import 'whatwg-fetch';
import 'es6-promise';

export function api(url, options) {
  return fetch(url, options).then((res) => res.json());
}
