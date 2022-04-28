import {
  SORT_ASCENDING,
  SORT_DESCENDING,
  FILTER_BY_API,
  FILTER_BY_DB,
} from "./index";
//A-Z
export function sortAscending() {
  return { type: SORT_ASCENDING };
}
//Z-A
export function sortDescending() {
  return { type: SORT_DESCENDING };
}
export function filterByApi() {
  return { type: FILTER_BY_API };
}
export function filterByDB() {
  return { type: FILTER_BY_DB };
}
