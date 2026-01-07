export default function delParamsOnUrl({ get, set, key, value }) {
  const params = new URLSearchParams(get);
  params.delete(key, value);
  set(params);
}
