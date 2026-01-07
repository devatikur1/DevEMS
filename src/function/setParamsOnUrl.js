export default function setParamsOnUrl({ get, set, key, value }) {
  const params = new URLSearchParams(get);
  params.set(key, value);
  set(params);
}
