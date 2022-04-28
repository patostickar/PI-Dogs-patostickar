import { SORT, FILTER, CLEAR_TEMPS } from "./index";

export function sort(direction, prop) {
  return { type: SORT, payload: { direction, prop } };
}
export function filter(key, value) {
  return { type: FILTER, payload: { key, value } };
}

export function clearTemperaments() {
  return { type: CLEAR_TEMPS };
}
