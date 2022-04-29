import { SORT, FILTER, CLEAR_TEMPS } from './index';

export function sort(direction, prop, pathname) {
  return { type: SORT, payload: { pathname, direction, prop } };
}
export function filter(key, value, pathname) {
  return { type: FILTER, payload: { pathname, key, value } };
}

export function clearTemperaments() {
  return { type: CLEAR_TEMPS };
}
