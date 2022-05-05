import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import style from './styles/Landing.module.css';

const Landing = () => {
  const dogs = useSelector((state) => state.dogs);
  function getRandomInt() {
    return Math.floor(Math.random() * dogs.length);
  }
  const luckyDogIdLink = `/dogs/${dogs[getRandomInt()]?.id}`;

  return (
    <div className={style.container}>
      <main className={style.text_container}>
        <p className={`${style.welcome} ${style.p}`}>Welcome!</p>
        <h1 className={style.title}>PUPPY CATALOG AND BEYOND</h1>
        <p className={`${style.find} ${style.p}`}>
          Find a puppy you like and add it to your collection
        </p>
        <div className={style.nums}></div>

        <Link to='/dogs'>
          <button class={`${style.button} ${style.learn_more} ${style.takeme}`}>
            <span class={style.circle} aria-hidden='true'>
              <span class={`${style.icon} ${style.arrow}`}></span>
            </span>
            <span class={style.button_text}>Take Me!</span>
          </button>
        </Link>
        <Link to={luckyDogIdLink}>
          <button class={`${style.button} ${style.learn_more} ${style.lucky}`}>
            <span class={style.circle} aria-hidden='true'>
              <span class={`${style.icon} ${style.arrow}`}></span>
            </span>
            <span class={style.button_text}>I'm Feeling Lucky</span>
          </button>
        </Link>
      </main>
      <footer className={style.footer}>
        <p className={style.p}>Made with 💛 by Patricio Stickar</p>
      </footer>
    </div>
  );
};

export default Landing;
