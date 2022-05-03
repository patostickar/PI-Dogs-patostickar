import {
  GET_DOGS,
  GET_DOG_DETAIL,
  GET_DOGS_BY_NAME,
  GET_TEMPS,
  CLEAR_TEMPS,
  CLEAR_DETAIL_PAGE,
  CLEAR_ALERT,
  SET_FAV,
  DEL_FAV,
  GET_ALERT,
  SORT,
  FILTER,
} from '../actions';

// Store - Is what holds all the data your application uses.
// Reducer - is what manipulates that data when it recieves an action.
// Action - is what tells reducer to manipulate the store data, it carries the name and (not required) some data.

// Separating api/db dogs enables to not call again the server to get the dogs back after a filter
//

export const initialState = {
  dogs: [],
  temperaments: [],
  dogDetail: [],
  favDogs: [],
  apiDogs: [],
  dbDogs: [],
  tempFilter: null,
  alertMessage: '',
};

/*
In the same reducer you'll need to store a list of the filters,
which will consist of the key to filter on and the value to filter by. e.g.
[{ key: 'sport', value: 'basketball'}, { key: 'country', value: 'NZ'}]
I can't include de API/DB here because the comparison is different (typeof vs includes)
*/

export default function reducer(state = initialState, { type, payload }) {
  // Hash Table instead of if/else or Switch (more efficient)
  const actions = {
    [GET_DOGS]: () => {
      const apiDogs = [];
      const dbDogs = [];
      payload.forEach((dog) => {
        if (typeof dog.id === 'number') return apiDogs.push(dog);
        dbDogs.push(dog);
      });
      return {
        ...state,
        apiDogs: apiDogs,
        dbDogs: dbDogs,
        dogs: [...dbDogs, ...apiDogs],
      };
    },
    [GET_DOGS_BY_NAME]: () => {
      return { ...state, dogs: payload };
    },
    [GET_DOG_DETAIL]: () => {
      return { ...state, dogDetail: payload };
    },
    [GET_TEMPS]: () => {
      return { ...state, temperaments: payload };
    },
    [SET_FAV]: () => {
      return {
        ...state,
        favDogs: state.favDogs.find((dog) => dog.id === payload.id)
          ? [...state.favDogs]
          : [...state.favDogs, payload],
      };
    },
    [DEL_FAV]: () => {
      return {
        ...state,
        favDogs: state.favDogs.filter((dog) => dog.id !== payload.id),
      };
    },
    [CLEAR_DETAIL_PAGE]: () => {
      return { ...state, dogDetail: {} };
    },
    [CLEAR_TEMPS]: () => {
      return { ...state, tempFilter: null };
    },
    [SORT]: () => {
      let sortedDogs;
      const dogsToSort = payload.pathname === '/dogs' ? 'dogs' : 'favDogs';
      if (payload.prop === 'name') {
        if (payload.direction === 'asc')
          sortedDogs = state[dogsToSort].sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        if (payload.direction === 'dsc')
          sortedDogs = state[dogsToSort].sort((a, b) =>
            b.name.localeCompare(a.name)
          );
      }

      if (payload.prop === 'weight') {
        if (payload.direction === 'asc')
          // MIN-MAX taking only min as reference
          sortedDogs = state[dogsToSort].sort(
            (a, b) => a.weight.min - b.weight.min
          );
        if (payload.direction === 'dsc')
          // MAX-MIN taking only max as reference (defaults to [0] in case of only one weight value)
          sortedDogs = state[dogsToSort].sort(
            (a, b) =>
              (b.weight.max || b.weight.min) - (a.weight.max || a.weight.min)
          );
      }
      return { ...state, [dogsToSort]: [...sortedDogs] };
    },
    // Because id has to be compared by typeof, I can't use the same filtering as with tempFilter
    [FILTER]: () => {
      if (payload.key === 'src') {
        if (payload.value === 'DB')
          return { ...state, dogs: [...state.dbDogs] };
        if (payload.value === 'API')
          return { ...state, dogs: [...state.apiDogs] };
        if (payload.value === 'ALL')
          return { ...state, dogs: [...state.dbDogs, ...state.apiDogs] };
      }
      // tempFilter
      if (payload.key === 'temperament') {
        if (payload.value === 'ALL') {
          return { ...state, tempFilter: null };
        }
        return {
          ...state,
          tempFilter: { key: payload.key, value: payload.value },
        };
      }
    },
    [GET_ALERT]: () => {
      return { ...state, alertMessage: payload };
    },
    [CLEAR_ALERT]: () => {
      return { ...state, alertMessage: '' };
    },
  };
  // same as case or default
  return actions[type] ? actions[type]() : state;
}
