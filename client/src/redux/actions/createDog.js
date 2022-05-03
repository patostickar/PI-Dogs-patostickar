import { GET_ALERT } from '.';
import { getDogs } from './getDogs';
import axios from 'axios';

export const createDog = (dog) => {
  return async (dispatch) => {
    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/dog`, dog);
      dispatch(getDogs());
      dispatch({ type: GET_ALERT, payload: `Dog ${dog.name} created 🐶` });
    } catch (err) {
      return dispatch({ type: GET_ALERT, payload: err.response.data });
    }
  };
};
