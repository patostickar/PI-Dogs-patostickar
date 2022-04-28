import { GET_DOGS, GET_DOG_DETAIL, GET_DOGS_BY_NAME, GET_ALERT } from "./index";

import axios from "axios";

const baseUrl = "http://localhost:3001";

export function getDogs() {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/dogs`)
      .then((res) => dispatch({ type: GET_DOGS, payload: res.data }));
  };
}

export function getDogByName(name) {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/dogs?name=${name}`)
      .then((res) => {
        if (Array.isArray(res.data))
          return dispatch({ type: GET_DOGS_BY_NAME, payload: res.data });
        return dispatch({ type: GET_ALERT, payload: res.data });
      })
      .catch((err) => console.log(err));
  };
}

export function getDogDetail(id) {
  return (dispatch) => {
    return axios
      .get(`${baseUrl}/dogs/${id}`)
      .then((res) => dispatch({ type: GET_DOG_DETAIL, payload: res.data }));
  };
}
