import { CLEAR_DETAIL_PAGE, SET_FAV, DEL_FAV } from "./index";

export function clearPage() {
  return {
    type: CLEAR_DETAIL_PAGE,
  };
}

export function setFav(payload) {
  return {
    type: SET_FAV,
    payload,
  };
}

export function delFav(payload) {
  return {
    type: DEL_FAV,
    payload,
  };
}
