import React from 'react';
import spinner from '../img/spinner2.gif';
// import styles from './styles/Spinner.module.css';

const Spinner = () => {
  return (
    // <div className={styles.container}>
    <div
      style={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <img src={spinner} alt='Loading' />
    </div>
    // </div>
  );
};

export default Spinner;
