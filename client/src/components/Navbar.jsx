import React from "react";

import { useDispatch } from "react-redux";
import { sort, filter } from "../redux/actions";
import SearchBar from "./SearchBar";
import Temperaments from "./Temperaments";
import ClearFields from "./ClearFields.jsx";

function Navbar() {
  const dispatch = useDispatch();

  return (
    <div>
      <SearchBar />
      <button onClick={() => dispatch(filter("src", "API"))}>API</button>
      <button onClick={() => dispatch(filter("src", "DB"))}>DB</button>
      <button onClick={() => dispatch(sort("dsc", "name"))}>DSC N</button>
      <button onClick={() => dispatch(sort("asc", "name"))}>ASC N</button>
      <button onClick={() => dispatch(sort("asc", "weight"))}>ASC W</button>
      <button onClick={() => dispatch(sort("dsc", "weight"))}>DSC W</button>
      <Temperaments />
      <ClearFields />
    </div>
  );
}

export default Navbar;
