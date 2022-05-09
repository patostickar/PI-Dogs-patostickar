import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getDogDetail, clearPage } from '../redux/actions';
import Spinner from './Spinner';
import Navbar from './Navbar.jsx';
import style from './styles/DogDetail.module.css';

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
    dispatch(getDogDetail(id));
    return () => {
      //TODO LO QUE SUCEDA DENTRO DEL RETURN ES CUANDO SE DESMONTA EL COMPONENTE
      dispatch(clearPage());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (name) {
      setIsLoading(false);
    }
  }, [name]);

  return (
    <>
      <Navbar />
      {isLoading ? (
        <Spinner />
      ) : (
        <div className={style.outer}>
          <div className={style.left}>
            <div className={style.lefBand}></div>
            <div
              style={{ backgroundImage: `url(${image})` }}
              className={style.image}
            />
          </div>
          <div className={style.right}>
            <h1 className={style.name}>{name}</h1>
            <h3 className={`${style.h3} ${style.life_span}`}>{life_span}</h3>

            <h3 className={`${style.h3} ${style.wh3}`}>Weight</h3>
            <div className={style.weight}>
              <div className={style.weight_info}>
                <p>Min</p>
                <p>{`${w?.min || `?`} kg`}</p>
              </div>
              <div className={style.weight_info}>
                <p>Max</p>
                <p>{`${w?.max || `?`} kg`}</p>
              </div>
            </div>
            <h3 className={`${style.h3} ${style.hh3}`}>Height</h3>
            <div className={style.weight}>
              <div className={style.weight_info}>
                <p>Min</p>
                <p>{`${h?.min || `?`} cm`}</p>
              </div>
              <div className={style.weight_info}>
                <p>Max</p>
                <p>{`${h?.max || `?`} cm`}</p>
              </div>
            </div>
            <h3 className={`${style.h3} ${style.th3}`}>Temperaments</h3>
            <ul className={style.ul}>
              {t?.map((t) => (
                <li className={style.li} key={t}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default DogDetail;
