import React from "react";
import { useSelector } from "react-redux";
import DogCard from "./DogCard";

const Dogs = () => {
  const dogs = useSelector((state) => state.dogs);
  const tempFilter = useSelector((state) => state.tempFilter);

  // This just checks that each person matches all of the filters
  // The every() method tests whether all elements in the array pass the test implemented by the provided function.
  // It returns a Boolean value.
  // This way I can filter by multiple temperaments {key: tempFilter, value: whatever}

  // .filter((dog) =>
  //         filters.length
  //           ? filters.every((filter) => dog[filter.key].includes(filter.value))
  //           : true
  //       )

  return (
    <>
      {dogs
        .filter((dog) =>
          tempFilter ? dog[tempFilter.key].includes(tempFilter.value) : true
        )
        .map((dog) => (
          <DogCard
            key={dog.id}
            id={dog.id}
            name={dog.name}
            w_min={dog.weight.min}
            w_max={dog.weight.max}
            temperament={dog.temperament}
            image={dog.image}
          />
        ))}
    </>
  );
};

export default Dogs;
