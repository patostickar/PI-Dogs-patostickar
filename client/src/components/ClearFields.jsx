import React from "react";
import { useDispatch } from "react-redux";
import { getDogByName, clearTemperaments } from "../redux/actions";
import styles from "./styles/ClearFields.module.css";

export default function ClearFields() {
  const dispatch = useDispatch();
  function clearFields() {
    dispatch(getDogByName(""));
    dispatch(clearTemperaments());
  }
  return (
    <button style={styles.button} onClick={clearFields}>
      🧹
    </button>
  );
}
