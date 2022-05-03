import { getDogs } from './getDogs';
import axios from 'axios';

export function createDog(dog) {
  axios
    .post(`${process.env.REACT_APP_BASE_URL}/dog`, dog)
    .then((res) => console.log(res))
    // .then(() => getDogs())
    .catch((err) => alert(err.response.data));
}
