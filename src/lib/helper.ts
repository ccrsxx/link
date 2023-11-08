import { URL_WITHOUT_PROTOCOL } from './env';

/**
 * Returns true if the url is not from the same domain.
 */
export function checkIfUrlIsValid(url: string): boolean {
  return !url.includes(URL_WITHOUT_PROTOCOL);
}
