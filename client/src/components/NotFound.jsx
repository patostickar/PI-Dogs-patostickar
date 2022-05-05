import React from 'react';
import notFound from '../img/404.jpg';
import style from './styles/NotFound.module.css';

export default function NotFound() {
  return (
    <div className={style.background}>
      <img src={notFound} alt='404' className={style.notFound} />
    </div>
  );
}
