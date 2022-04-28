import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getDogByName } from "../redux/actions";
import styles from "./styles/SearchBar.modules.css";

export default function SearchBar() {
  const [value, setValue] = useState("");
  const dispatch = useDispatch();

  function handleChange(e) {
    setValue(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validInput(value)) return console.log("invalid input");
    if (!value) return console.log("empty search");
    dispatch(getDogByName(value));
    setValue("");
  }

  function validInput(input) {
    return /^[a-zA-Z ]*$/.test(input);
  }

  function getAllDogs() {
    dispatch(getDogByName(""));
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Find a puppy.."
          value={value}
          onChange={handleChange}
        />
        <input type="submit" value="🔎" />
      </form>
      <button style={styles.button} onClick={getAllDogs}>
        🧹
      </button>
    </div>
  );
}
