import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getDogByName } from '../redux/actions';
import style from './styles/SearchBar.module.css';

export default function SearchBar() {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validInput(value)) return console.log('invalid input');
    if (!value) return console.log('empty search');
    dispatch(getDogByName(value));
    setValue('');
  }

  function validInput(input) {
    return /^[a-zA-Z ]*$/.test(input);
  }

  return (
    <form onSubmit={handleSubmit} id={style.form}>
      <input
        type='search'
        autoComplete='off'
        placeholder='Find a puppy..'
        value={value}
        onChange={handleChange}
        className={style.searchInput}
      />
      <i class={`fa-solid fa-magnifying-glass ${style.fa}`}></i>
    </form>
  );
}
