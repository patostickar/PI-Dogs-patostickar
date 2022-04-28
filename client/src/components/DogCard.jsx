import React from "react";

const DogCard = (props) => {
  const { id, name, w_min, w_max, temperament: t, image } = props;

  return (
    <div>
      <p>{image}</p>
      <p>{name}</p>
      <p>Min: {w_min || `-`}</p>
      <p>Max: {w_max || `-`}</p>
      <ul>
        {t.map((t) => (
          <li key={t}>{t}</li>
        ))}
        <p>{id}</p>
      </ul>
    </div>
  );
};

export default DogCard;
