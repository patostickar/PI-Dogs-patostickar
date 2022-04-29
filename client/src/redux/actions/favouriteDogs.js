import { SET_FAV, DEL_FAV } from './index';

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
