import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { sort, filter } from '../redux/actions';
import { useLocation } from 'react-router-dom';
import SearchBar from './SearchBar';
import Temperaments from './Temperaments';
import ClearFields from './ClearFields.jsx';

function Navbar() {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  return (
    <div>
      <SearchBar />
      <Link to='/dogs'>
        <button>HOME</button>
      </Link>
      <Link to='/favourites'>
        <button>FAVS</button>
      </Link>
      {pathname === '/dogs' ? (
        <>
          <button onClick={() => dispatch(filter('src', 'API', pathname))}>
            API
          </button>
          <button onClick={() => dispatch(filter('src', 'DB', pathname))}>
            DB
          </button>
          <button onClick={() => dispatch(filter('src', 'ALL', pathname))}>
            ALL
          </button>
        </>
      ) : null}
      <button onClick={() => dispatch(sort('dsc', 'name', pathname))}>
        DSC N
      </button>
      <button onClick={() => dispatch(sort('asc', 'name', pathname))}>
        ASC N
      </button>
      <button onClick={() => dispatch(sort('asc', 'weight', pathname))}>
        ASC W
      </button>
      <button onClick={() => dispatch(sort('dsc', 'weight', pathname))}>
        DSC W
      </button>
      <Temperaments />
      <ClearFields />
    </div>
  );
}

export default Navbar;
