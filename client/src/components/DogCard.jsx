import React from "react";

const DogCard = (props) => {
  const { id, name, weight, temperament, image } = props;

  return (
    <div>
      <p>{image}</p>
      <p>{name}</p>
      <p>{weight}</p>
      <p>{temperament}</p>
      <p>{id}</p>
    </div>
  );
};

export default DogCard;
