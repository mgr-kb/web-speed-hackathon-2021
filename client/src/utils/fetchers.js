import { gzip } from 'pako';

const fetchError = result =>
  new Error(
    `HttpStatus=${result.status || 500}:
    message=${result.statusText || 'Internal Server Error'}`);

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  const result = await fetch(url);
  return result.ok ? result.arrayBuffer() : Promise.reject(fetchError(result));
}

/**
 * @template T
 * @param {string} url
 * @returns {Promise<T>}
 */
async function fetchJSON(url) {
  const result = await fetch(url);
  return result.ok ? result.json() : Promise.reject(fetchError(result));
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  });
  return result.ok ? result.json() : Promise.reject(fetchError(result));
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data);
  const uint8Array = new TextEncoder().encode(jsonString);
  const compressed = gzip(uint8Array);

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    body: compressed,
  });
  return result.ok ? result.json() : Promise.reject(fetchError(result));
}

export { fetchBinary, fetchJSON, sendFile, sendJSON };
