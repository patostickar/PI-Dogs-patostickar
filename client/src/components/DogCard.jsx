import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setFav, delFav } from '../redux/actions';

const DogCard = ({ dog }) => {
  const { id, name, weight: w, temperament: t, image } = dog;
  const dispatch = useDispatch();
  return (
    <div>
      <p>{image}</p>
      <button onClick={() => dispatch(setFav(dog))}>❤️</button>
      <button onClick={() => dispatch(delFav(dog))}>💥</button>
      <Link to={`/dogs/${id}`}>
        <p>{name}</p>
      </Link>
      <p>Min: {w.min || `-`}</p>
      <p>Max: {w.max || `-`}</p>
      <ul>
        {t.map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <p>{id}</p>
    </div>
  );
};

export default DogCard;
