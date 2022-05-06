import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sort, filter } from '../redux/actions';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Temperaments from './Temperaments';
import ClearFields from './ClearFields.jsx';
import style from './styles/Navbar.module.css';

function Navbar() {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  return (
    <div className={style.navbar}>
      <Link to='/'>
        <p>Home</p>
      </Link>
      <Link to='/dogs'>
        <p>Dogs</p>
      </Link>
      <Link to='/favourites'>
        <p>Favourites</p>
      </Link>
      <Link to='/dog'>
        <p>Create</p>
      </Link>
      {/^\/dogs$/.test(pathname) || /\/favourites/.test(pathname) ? (
        <>
          <SearchBar />
          <ClearFields />
          <div className={style.dropdown}>
            <button className={style.dropbtn}>
              Sort
              <i className={`fa-solid fa-caret-down ${style.fa}`}></i>
            </button>
            <div className={style.dropdown_content}>
              <button onClick={() => dispatch(sort('asc', 'name', pathname))}>
                Name A-Z
              </button>
              <button onClick={() => dispatch(sort('dsc', 'name', pathname))}>
                Name Z-A
              </button>
              <button onClick={() => dispatch(sort('dsc', 'weight', pathname))}>
                Weight ⬇️
              </button>
              <button onClick={() => dispatch(sort('asc', 'weight', pathname))}>
                Weight ⬆️
              </button>
            </div>
          </div>

          {pathname === '/dogs' ? (
            <div className={style.dropdown}>
              <button className={style.dropbtn}>
                Source
                <i className={`fa-solid fa-caret-down ${style.fa}`}></i>
              </button>
              <div className={style.dropdown_content}>
                <button
                  onClick={() => dispatch(filter('src', 'API', pathname))}
                >
                  API
                </button>
                <button onClick={() => dispatch(filter('src', 'DB', pathname))}>
                  DB
                </button>
                <button
                  onClick={() => dispatch(filter('src', 'ALL', pathname))}
                >
                  All
                </button>
              </div>
            </div>
          ) : null}
          <Temperaments />
        </>
      ) : null}
    </div>
  );
}

export default Navbar;
