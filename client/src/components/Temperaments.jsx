import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../redux/actions';

export default function Temperaments() {
  const temps = useSelector((state) => state.temperaments);
  const value = useSelector((state) =>
    state.tempFilter ? state.tempFilter.value : 'Temperaments'
  );
  const dispatch = useDispatch();

  function handleChange(e) {
    dispatch(filter('temperament', e.target.value));
  }

  return (
    <select onChange={handleChange} value={value}>
      <option disabled>Temperaments</option>
      <option value='ALL'>ALL</option>
      {temps?.map((t) => (
        <option value={t.name} key={t.id}>
          {t.name}
        </option>
      ))}
    </select>
  );
}
