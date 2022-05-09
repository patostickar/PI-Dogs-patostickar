import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import Navbar from './Navbar';
import DogCard from './DogCard';
import Pagination from './Pagination';
import style from './styles/Main.module.css';

const Main = () => {
  const dogs = useSelector((state) => state.dogs);
  const tempFilter = useSelector((state) => state.tempFilter);

  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);
  const [dogsWithTemperament, setDogsWithTemperament] = useState(true);

  // Indexes for pagination
  const indexOfLastDog = currentPage * dogsPerPage; // 8 - 16 - 24
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0 - 8 - 16
  // Filter by temperaments
  const filteredDogs = dogs.filter((dog) =>
    tempFilter ? dog[tempFilter.key].includes(tempFilter.value) : true
  );
  // Slice the filtered dogs array
  const currentDogs = filteredDogs.slice(indexOfFirstDog, indexOfLastDog); // 0-8, 8-16, 16-24

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    if (dogs.length) {
      setIsLoading(false);
    }

    !filteredDogs?.length
      ? setDogsWithTemperament(false)
      : setDogsWithTemperament(true);

    setCurrentPage(1);
  }, [dogs.length, filteredDogs.length]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <main className={style.main}>
            {!dogsWithTemperament && <h1>No dogs with that Temperament</h1>}
            {currentDogs.map((dog) => (
              <DogCard dog={dog} key={dog.id} />
            ))}
          </main>
          <Pagination
            dogsPerPage={dogsPerPage}
            totalDogs={filteredDogs.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      )}
    </>
  );
};

export default Main;

// This just checks that each person matches all of the filters
// The every() method tests whether all elements in the array pass the test implemented by the provided function.
// It returns a Boolean value.
// This way I can filter by multiple temperaments {key: tempFilter, value: whatever}

// .filter((dog) =>
//         filters.length
//           ? filters.every((filter) => dog[filter.key].includes(filter.value))
//           : true
//       )
