import React from "react";
import { useSelector } from "react-redux";
import DogCard from "./DogCard";

const Dogs = () => {
  const dogs = useSelector((state) => state.dogs);

  return (
    <>
      {dogs.map((dog) => (
        <DogCard
          key={dog.id}
          id={dog.id}
          name={dog.name}
          weight={dog.weight}
          temperamnt={dog.temperamnt}
          image={dog.image}
        />
      ))}
    </>
  );
};

export default Dogs;
