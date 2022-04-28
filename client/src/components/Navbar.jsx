import React from "react";
import SearchBar from "./SearchBar";
import { useDispatch } from "react-redux";
import {
  filterByApi,
  filterByDB,
  sortAscending,
  sortDescending,
} from "../redux/actions";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(filterByApi())}>API</button>
      <button onClick={() => dispatch(filterByDB())}>DB</button>
      <button onClick={() => dispatch(sortAscending())}>ASC</button>
      <button onClick={() => dispatch(sortDescending())}>DESC</button>
      <SearchBar />
    </div>
  );
}

export default Navbar;
