import pick from 'lodash/pick';
import LZString from 'lz-string';

const URL_KEYS = ['preset', 'props', 'theme'];

const compress = (string: string) =>
  LZString.compressToBase64(string)
    .replace(/\+/g, '-') // Convert '+' to '-'.
    .replace(/\//g, '_') // Convert '/' to '_'.
    .replace(/=+$/, ''); // Remove ending '='.

const decompress = (string: string) =>
  LZString.decompressFromBase64(string.replace(/-/g, '+').replace(/_/g, '/'));

export function updateQuery(state: {}) {
  try {
    const query = pick(state, URL_KEYS);
    const serialized = JSON.stringify(query);
    const compressed = compress(serialized);
    const encoded = encodeURIComponent(compressed);
    const hash = '?' + encoded;
    window.location.hash = hash;
  } catch (_) {
    // It's alright.
  }
}

export function parseQuery() {
  try {
    const hash = document.location.hash.replace(/^#\?/, '');
    const decoded = decodeURIComponent(hash);
    const decompressed = decompress(decoded);
    const deserialized = JSON.parse(decompressed ?? '');
    const query = pick(deserialized, URL_KEYS);
    return query;
  } catch (_) {
    return {};
  }
}
