export function api(url, options) {
  return fetch(url, options).then((res) => res.json());
}
