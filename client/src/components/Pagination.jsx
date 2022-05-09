import React, { useState, useEffect } from 'react';
import style from './styles/Pagination.module.css';

const Pagination = ({ dogsPerPage, totalDogs, paginate, currentPage }) => {
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

  // const totalList = Math.ceil(pageNumbers.length / buttonsPerList);

  useEffect(() => {
    setCurrentList(
      Math.floor(
        currentPage / buttonsPerList - (buttonsPerList + 1) / buttonsPerList + 2
      )
    );
  }, [currentPage, buttonsPerList]);

  return (
    <footer>
      <div className={style.pagination}>
        <ul>
          <li>
            <button
              disabled={currentPage === 1 ? true : false}
              onClick={() => paginate(currentPage - 1)}
            >
              <i className='fa-solid fa-angle-left'></i>
            </button>
          </li>
          {currentButtons.map((number) => (
            <li key={number}>
              <button
                onClick={() => paginate(number)}
                className={number === currentPage ? style.active : null}
              >
                {number}
              </button>
            </li>
          ))}
          <li>
            <button
              disabled={
                currentPage === Math.ceil(totalDogs / dogsPerPage)
                  ? true
                  : false
              }
              onClick={() => paginate(currentPage + 1)}
            >
              <i className='fa-solid fa-angle-right'></i>
            </button>
          </li>
        </ul>
      </div>
    </footer>
  );
};

export default Pagination;
