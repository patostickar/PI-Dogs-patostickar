import React from 'react';
import { useDispatch } from 'react-redux';
import { getDogs, clearTemperaments } from '../redux/actions';
import style from './styles/ClearFields.module.css';

export default function ClearFields() {
  const dispatch = useDispatch();
  function clearFields() {
    dispatch(getDogs());
    dispatch(clearTemperaments());
  }
  return (
    <button className={style.button} onClick={clearFields}>
      <div>
        <i className={`fa-solid fa-trash-can ${style.fa}`} />
      </div>
    </button>
  );
}
