import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setFav, delFav } from '../redux/actions';
import style from './styles/DogCard.module.css';
import redFilledHeart from '../img/redFilledHeart.png';
import grayHeart from '../img/grayHeart.png';
import fallbackImg from '../img/fallbackImg.jpg';

const DogCard = ({ dog }) => {
  const { id, name, weight: w, temperament: t, image } = dog;
  const favs = useSelector((state) => state.favDogs);
  const dispatch = useDispatch();

  const fav = !!favs?.filter((d) => d.id === id).length;
  const [isFav, setFavState] = useState(fav);

  function favToggle() {
    isFav ? dispatch(delFav(dog)) : dispatch(setFav(dog));
    setFavState(!isFav);
  }
  return (
    <article className={style.card}>
      <div className={style.thumb}>
        <img
          src={image}
          alt=''
          onError={(e) => (e.currentTarget.src = fallbackImg)}
        />
      </div>
      <div className={style.infos}>
        <h2 className={style.title}>
          {name}

          {isFav ? (
            <span
              className={style.fav}
              onClick={favToggle}
              style={{
                backgroundImage: `url(${redFilledHeart})`,
              }}
            ></span>
          ) : (
            <span
              className={style.fav}
              onClick={favToggle}
              style={{
                backgroundImage: `url(${grayHeart})`,
              }}
            ></span>
          )}
          <i className={`fa-solid fa-angles-up ${style.fa}`}></i>
        </h2>
        <h3 className={style.temperament}>Temperaments</h3>
        <ul className={style.ul}>
          {t.map((t) => (
            <li className={style.li} key={t}>
              {t}
            </li>
          ))}
        </ul>
        <div className={style.weight}>
          <div className={style.weight_info}>
            <p>Min</p>
            <p className={style.num}>{`${w.min || `?`} kg`}</p>
          </div>
          <div className={style.weight_info}>
            <p>Max</p>
            <p className={style.num}>{`${w.max || `?`} kg`}</p>
          </div>
        </div>
        <Link to={`/dogs/${id}`}>
          <h3 className={style.details}>MORE INFO</h3>
        </Link>
      </div>
    </article>
  );
};

export default DogCard;
