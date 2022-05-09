import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import DogCard from './DogCard';
import style from './styles/Main.module.css';

const Favourites = () => {
  const favDogs = useSelector((state) => state.favDogs);
  const tempFilter = useSelector((state) => state.tempFilter);

  return (
    <>
      <Navbar />
      <div className={style.main}>
        {!favDogs.length ? (
          <h1>You don't have any favourite puppy 🐶</h1>
        ) : (
          favDogs
            .filter((dog) =>
              tempFilter ? dog[tempFilter.key].includes(tempFilter.value) : true
            )
            .map((dog) => <DogCard dog={dog} key={dog.id} />)
        )}
      </div>
    </>
  );
};

export default Favourites;
