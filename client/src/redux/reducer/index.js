import {
  GET_DOGS,
  GET_DOG_DETAIL,
  GET_DOGS_BY_NAME,
  CLEAR_PAGE,
  SET_FAV,
  DEL_FAV,
  GET_ALERT,
  SORT_ASCENDING,
  SORT_DESCENDING,
  FILTER_BY_API,
  FILTER_BY_DB,
  FILTER_BY_TEMPERAMENT,
} from "../actions";

// Store - Is what holds all the data your application uses.
// Reducer - is what manipulates that data when it recieves an action.
// Action - is what tells reducer to manipulate the store data, it carries the name and (not required) some data.

// Separating api/db dogs enables to not call again the server to get the dogs back after a filter
//

export const initialState = {
  dogs: [],
  dogDetail: [],
  favDogs: [],
  apiDogs: [],
  dbDogs: [],
  temperamentFilter: "",
  alertMessage: "",
};

/*

In the same reducer you'll need to store a list of the filters which will consist of the key to filter on and the value to filter by. e.g.

[{ key: 'sport', value: 'basketball'}, { key: 'country', value: 'NZ'}]
then you just apply the filters on the list of people:

people.filter(person => filters.every(filter => person[filter.key] === filter.value))
This just checks that each person matches all of the filters
 */

export default function reducer(state = initialState, { type, payload }) {
  // Hash Table instead of if/else or Switch (more efficient)
  const actions = {
    [GET_DOGS]: () => {
      const apiDogs = [];
      const dbDogs = [];
      payload.forEach((dog) => {
        if (typeof dog.id === "number") return apiDogs.push(dog);
        dbDogs.push(dog);
      });
      return {
        ...state,
        apiDogs: apiDogs,
        dbDogs: dbDogs,
        dogs: [...apiDogs, ...dbDogs],
      };
    },
    [GET_DOGS_BY_NAME]: () => {
      return { ...state, dogs: payload };
    },
    [GET_DOG_DETAIL]: () => {
      return { ...state, dogDetail: payload };
    },
    [SET_FAV]: () => {
      return {
        ...state,
        favDogs: state.favDogs.filter((dog) => dog.id === payload.id)
          ? [...state.favDogs]
          : [...state.favDogs, payload],
      };
    },
    [DEL_FAV]: () => {
      return {
        ...state,
        dodogDetail: state.favDogs.filter((dog) => dog.id !== payload.id),
      };
    },
    [CLEAR_PAGE]: () => {
      return { ...state, dogDetail: {} };
    },
    [SORT_ASCENDING]: () => {
      const ascendingDogs = state.dogs.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      return { ...state, dogs: [...ascendingDogs] };
    },
    [SORT_DESCENDING]: () => {
      const descendingDogs = state.dogs.sort((a, b) =>
        b.name.localeCompare(a.name)
      );
      return { ...state, dogs: [...descendingDogs] };
    },
    [FILTER_BY_API]: () => {
      return { ...state, dogs: [...state.apiDogs] };
    },
    [FILTER_BY_DB]: () => {
      return { ...state, dogs: [...state.dbDogs] };
    },
    [FILTER_BY_TEMPERAMENT]: () => {
      return { ...state, dogs: [...state.dbDogs] };
    },
    [GET_ALERT]: () => {
      return { ...state, alertMessage: payload };
    },
  };

  return actions[type] ? actions[type]() : state;
}
