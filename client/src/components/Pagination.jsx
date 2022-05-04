import React, { useState } from 'react';
import style from './styles/Pagination.module.css';

const Pagination = ({ dogsPerPage, totalDogs, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalDogs / dogsPerPage); i++) {
    pageNumbers.push(i);
  }

  // Pagination of pagination buttons
  const [currentList, setCurrentList] = useState(1);
  const [buttonsPerList] = useState(5);

  const indexOfLastButton = currentList * buttonsPerList;
  const indexOfFirstButton = indexOfLastButton - buttonsPerList;
  const currentButtons = pageNumbers.slice(
    indexOfFirstButton,
    indexOfLastButton
  );

  const totalList = Math.ceil(pageNumbers.length / buttonsPerList);

  return (
    <footer>
      <ul className='pagination'>
        <li>
          <button
            disabled={currentList === 1 ? true : false}
            onClick={() => setCurrentList(currentList - 1)}
          >
            ⬅️
          </button>
        </li>
        {currentButtons.map((number) => (
          <li key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </li>
        ))}
        <li>
          <button
            disabled={currentList === totalList ? true : false}
            onClick={() => setCurrentList(currentList + 1)}
          >
            ➡️
          </button>
        </li>
      </ul>
    </footer>
  );
};

export default Pagination;
