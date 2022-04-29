import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogDetail, clearPage } from '../redux/actions';
import Spinner from './Spinner';

const DogDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);

  const {
    image,
    name,
    life_span,
    weight: w,
    height: h,
    temperament: t,
  } = useSelector((state) => state.dogDetail);

  useEffect(() => {
    dispatch(getDogDetail(Number(id)));
    return () => {
      //TODO LO QUE SUCEDA DENTRO DEL RETURN ES CUANDO SE DESMONTA EL COMPONENTE
      dispatch(clearPage());
    };
  });

  useEffect(() => {
    if (name) {
      setIsLoading(false);
    }
  }, [name]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <div>
          <p>{image}</p>
          <p>{name}</p>
          <p>{life_span}</p>
          <p>Weight</p>
          <p>Min: {w?.min || `-`}</p>
          <p>Max: {w?.max || `-`}</p>
          <p>Height</p>
          <p>Min: {h?.min || `-`}</p>
          <p>Max: {h?.max || `-`}</p>
          <ul>
            {t.map((t) => (
              <li key={t}>{t}</li>
            ))}
            <p>{id}</p>
          </ul>
        </div>
      )}
    </>
  );
};

export default DogDetail;
