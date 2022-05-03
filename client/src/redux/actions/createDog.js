import { GET_ALERT } from './index';
import { getDogs } from './getDogs';
import axios from 'axios';

export async function createDog(dog) {
  await axios
    .post(`${process.env.REACT_APP_BASE_URL}/dog`, dog)
    .then((res) => console.log(res))
    // .then(() => getDogs())
    .catch((err) => alert(err.response.data));
}
