import React from 'react';
import { useSelector } from 'react-redux';
import Navbar from './Navbar';
import GoBackBtn from './GoBackBtn';
import DogCard from './DogCard';

const Favourites = () => {
  const favDogs = useSelector((state) => state.favDogs);
  const tempFilter = useSelector((state) => state.tempFilter);

  return (
    <>
      <Navbar />
      <GoBackBtn />
      {!favDogs.length ? (
        <h1>You don't have any favourite puppy 🐶</h1>
      ) : (
        favDogs
          .filter((dog) =>
            tempFilter ? dog[tempFilter.key].includes(tempFilter.value) : true
          )
          .map((dog) => <DogCard dog={dog} key={dog.id} />)
      )}
    </>
  );
};

export default Favourites;
