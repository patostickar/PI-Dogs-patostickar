import React from 'react';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import Spinner from './Spinner';
import Navbar from './Navbar';
import DogCard from './DogCard';
import Pagination from './Pagination';
import Alert from './Alert';

const Main = () => {
  const dogs = useSelector((state) => state.dogs);
  const tempFilter = useSelector((state) => state.tempFilter);
  const [isLoading, setIsLoading] = useState(true);
  const alertMessage = useSelector((state) => state.alertMessage);
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  useEffect(() => {
    if (dogs.length) {
      setIsLoading(false);
    }
    setCurrentPage(1);
  }, [dogs]);

  // Get current Dogs
  const indexOfLastDog = currentPage * dogsPerPage; // 8 - 16 - 24
  const indexOfFirstDog = indexOfLastDog - dogsPerPage; // 0 - 8 - 16
  const currentDogs = dogs.slice(indexOfFirstDog, indexOfLastDog); // 0-8, 8-16, 16-24

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          {alertMessage && <Alert delay='3000' />}
          {currentDogs
            .filter((dog) =>
              tempFilter ? dog[tempFilter.key].includes(tempFilter.value) : true
            )
            .map((dog) => (
              <DogCard dog={dog} key={dog.id} />
            ))}

          <Pagination
            dogsPerPage={dogsPerPage}
            totalDogs={dogs.length}
            paginate={paginate}
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
