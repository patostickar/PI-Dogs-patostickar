import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './styles/Landing.module.css';

const Landing = () => {
  const dogs = useSelector((state) => state.dogs);
  function getRandomInt() {
    return Math.floor(Math.random() * dogs.length);
  }
  const luckyDogIdLink = `/dogs/${dogs[getRandomInt()]?.id}`;

  return (
    <div className={styles.container}>
      <main className={styles.text_container}>
        <p className={styles.welcome}>Welcome!</p>
        <h1 className={styles.title}>PUPPY CATALOG AND BEYOND</h1>
        <p className={styles.find}>
          Find a puppy you like and add it to your collection
        </p>
        <div className={styles.nums}></div>

        <Link to='/dogs'>
          <button class={`${styles.learn_more} ${styles.takeme}`}>
            <span class={styles.circle} aria-hidden='true'>
              <span class={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span class={styles.button_text}>Take Me!</span>
          </button>
        </Link>
        <Link to={luckyDogIdLink}>
          <button button class={`${styles.learn_more} ${styles.lucky}`}>
            <span class={styles.circle} aria-hidden='true'>
              <span class={`${styles.icon} ${styles.arrow}`}></span>
            </span>
            <span class={styles.button_text}>I'm Feeling Lucky</span>
          </button>
        </Link>
      </main>
      <footer className={styles.footer}>
        <p>Made with 💛 by Patricio Stickar</p>
      </footer>
    </div>
  );
};

export default Landing;
