import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { filter } from '../redux/actions';
import style from './styles/Temperaments.module.css';

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
    <button>
      <select onChange={handleChange} value={value} className={style.select}>
        <option disabled className={style.option}>
          Temperaments
        </option>
        <option value='ALL' className={style.option}>
          ALL
        </option>
        {temps?.map((t) => (
          <option value={t.name} key={t.id} className={style.option}>
            {t.name}
          </option>
        ))}
      </select>
      <i className={`fa-solid fa-caret-down ${style.fa}`}></i>
    </button>
  );
}
