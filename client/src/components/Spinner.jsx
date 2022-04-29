import React from 'react';
import spinner from '../img/spinner.gif';
import styles from './styles/Spinner.module.css';

const Spinner = () => {
  return (
    <div className={styles.container}>
      <img
        src={spinner}
        style={{ width: '200px', margin: 'auto', display: 'block' }}
        alt='Loading'
      />
    </div>
  );
};

export default Spinner;
