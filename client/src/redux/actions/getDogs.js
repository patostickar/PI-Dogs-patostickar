import {
  GET_DOGS,
  GET_DOG_DETAIL,
  GET_DOGS_BY_NAME,
  CLEAR_DETAIL_PAGE,
  GET_ALERT,
  GET_TEMPS,
} from './index';

import axios from 'axios';

export function getDogs() {
  return (dispatch) => {
    return axios
      .get(`/dogs`)
      .then((res) => dispatch({ type: GET_DOGS, payload: res.data }))
      .catch((err) => {
        dispatch({ type: GET_ALERT, payload: err.message });
        console.log(err);
      });
  };
}

export function getDogByName(name) {
  return (dispatch) => {
    return axios
      .get(`/dogs?name=${name}`)
      .then((res) => {
        if (Array.isArray(res.data))
          return dispatch({ type: GET_DOGS_BY_NAME, payload: res.data }); // Dog found
        return dispatch({ type: GET_ALERT, payload: res.data }); // Dog not found
      })
      .catch((err) => {
        dispatch({ type: GET_ALERT, payload: err.message });
        console.log(err);
      });
  };
}

export function getDogDetail(id) {
  return (dispatch) => {
    return axios
      .get(`/dogs/${id}`)
      .then((res) => {
        if (typeof res.data === 'object') {
          return dispatch({ type: GET_DOG_DETAIL, payload: res.data });
        } // Dog found
        return dispatch({ type: GET_ALERT, payload: res.data }); // Dog not found
      })
      .catch((err) => {
        dispatch({ type: GET_ALERT, payload: err.message });
        console.log(err);
      });
  };
}

export function clearPage() {
  return {
    type: CLEAR_DETAIL_PAGE,
  };
}

export const getTemps = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/temperament`);
      const temps = res.data.sort((a, b) => a.name.localeCompare(b.name));
      return dispatch({ type: GET_TEMPS, payload: temps });
    } catch (err) {
      dispatch({ type: GET_ALERT, payload: err.message });
      console.log(err);
    }
  };
};
