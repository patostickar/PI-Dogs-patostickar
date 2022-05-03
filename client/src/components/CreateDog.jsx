import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALERT } from '../redux/actions';
import { createDog } from '../redux/actions/createDog.js';
import { getDogs } from '../redux/actions';
import Alert from './Alert';

export default function Form() {
  const [input, setInput] = useState({
    name: '',
    height_min: '',
    height_max: '',
    weight_min: '',
    weight_max: '',
    life_span: '',
    image: '',
    temperamentList: [],
    temperamentInput: '',
    temperament: [],
  });
  const temps = useSelector((state) => state?.temperaments);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  const alertMessage = useSelector((state) => state.alertMessage);

  // Hashmap of validations
  function validateInput(name, value) {
    const inputs = {
      // if any condition is true = invalid
      name: (value) => {
        return typeof value !== 'string' || !/^[a-zA-Z ]*$/.test(value);
      },
      height_min: (value) => {
        return +value <= 0 || !Number.isInteger(+value);
      },
      height_max: (value) => {
        return +value <= 0 || !Number.isInteger(+value);
      },
      weight_min: (value) => {
        return +value <= 0 || !Number.isInteger(+value);
      },
      weight_max: (value) => {
        return +value <= 0 || !Number.isInteger(+value);
      },
      life_span: (value) => {
        return +value < 0 || !Number.isInteger(+value);
      },
      image: (value) => {
        return value !== ''
          ? !/(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/.test(value)
          : false;
      },
      temperamentInput: (value) => {
        return typeof value !== 'string' || !/^[a-zA-Z ,]*$/.test(value);
      },
    };

    // required inputs
    if (
      name === 'name' ||
      name === 'height_min' ||
      name === 'height_max' ||
      name === 'weight_min' ||
      name === 'weight_max'
    ) {
      return !value
        ? `${name} is required`
        : inputs[name](value)
        ? `${name} is invalid`
        : false;
    } else {
      // optional inputs
      return inputs?.[name]?.(value) ? `${name} is invalid` : false;
    }
  }

  // Set if input has been touched
  const handleOnBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Get values from HTML collection, combine with input temps and return a Set of unique temps
  const handleTempList = (e) => {
    const temperaments = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setInput({
      ...input,
      temperamentList: temperaments,
      temperament: Array.from(
        new Set([
          ...input.temperamentInput
            .replace(/ /g, '')
            .split(',')
            .filter((t) => t !== ''),
          ...temperaments,
        ])
      ),
    });
  };

  // onBlur because validation is over the text while onChange
  // set touched as always, then get a map of values that are already selected (faster comparison)
  // remove whitespace, split and filter duplicate values
  const handleTempInput = (e) => {
    setTouched({ ...touched, [e.target.name]: true });

    const { value } = e.target;

    // Avoid duplication between input and list
    const tempList = input.temperamentList.map((t) => t.toLowerCase());
    const newTemps = value
      .replace(/ /g, '')
      .split(',')
      .filter((t) => !tempList.includes(t.toLowerCase()) && t !== '');

    setInput({
      ...input,
      temperamentInput: value,
      temperament: [...input.temperamentList, ...newTemps],
    });
  };

  // Set state of input value and errors if any
  const handleChange = (e) => {
    const { name, value } = e.target;

    setErrors({ ...errors, [name]: validateInput(name, value) });
    setInput({ ...input, [name]: value });
  };

  // Validate everything onSubmit (in case it is submitted before any interactions)

  const handleSubmit = (e) => {
    e.preventDefault();

    function validateAll(inputs) {
      const errors = {};
      for (const input in inputs) {
        errors[input] = validateInput(input, inputs[input]);
      }
      return errors;
    }

    const errorList = Object.values(validateAll(input)).filter(
      (error) => error !== false
    );

    if (errorList.length) {
      console.log('errors');
      return dispatch({ type: GET_ALERT, payload: errorList.join(' & ') });
    }
    const {
      name,
      height_min,
      height_max,
      weight_min,
      weight_max,
      life_span,
      temperament,
      image,
    } = input;
    const dog = {
      name,
      height_min: parseFloat(height_min),
      height_max: parseFloat(height_max),
      weight_min: parseFloat(weight_min),
      weight_max: parseFloat(weight_max),
      image,
      temperament,
    };
    if (!image)
      dog.image =
        'https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg';
    if (life_span) dog.life_span = parseFloat(life_span);
    createDog(dog);
    dispatch(getDogs());
  };

  // Check if input has been touched and if it has errors
  // Differentiate if error is false or hasn't been checked
  const setCheckOrCross = (input) => {
    return touched[input] // touched?
      ? errors[input] // has errors?
        ? '❌'
        : errors.hasOwnProperty(input) && errors[input] === false // no error or empty?
        ? '✅'
        : null
      : null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {alertMessage && <Alert delay='3000' />}
        <Link to='/dogs'>
          <button>CLOSE</button>
        </Link>
        <label>Name:</label>
        {/* Si hay errors.name se agrega la clase danger */}
        <input
          type='text'
          name='name'
          value={input.name}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('name')}
        <label>Min Height:</label>
        {/* Si hay errors.name se agrega la clase danger */}
        <input
          type='number'
          name='height_min'
          min='0'
          value={input.height_min}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('height_min')}
        <label>Max Height:</label>
        <input
          type='number'
          name='height_max'
          min='0'
          value={input.height_max}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('height_max')}
        <label>Min Weight:</label>
        <input
          type='number'
          name='weight_min'
          min='0'
          value={input.weight_min}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('weight_min')}
        <label>Max Weight:</label>
        <input
          type='number'
          name='weight_max'
          min='0'
          value={input.weight_max}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('weight_max')}
        <label>Life Span:</label>
        <input
          type='number'
          name='life_span'
          min='0'
          value={input.life_span}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('life_span')}
        <label>Image URL:</label>
        {/* Si hay errors.name se agrega la clase danger */}
        <input
          type='text'
          name='image'
          placeholder='Provide a valid image URL'
          value={input.image}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('image')}
        <label>Temperaments:</label>
        <label>Choose</label>
        <select multiple onChange={handleTempList}>
          <option disabled>Temperaments</option>
          <option>None</option>
          {temps?.map((t) => (
            <option value={t.name} key={t.id}>
              {t.name}
            </option>
          ))}
        </select>
        <label>or create</label>
        {/* Si hay errors.name se agrega la clase danger */}
        <input
          type='text'
          name='temperamentInput'
          placeholder='Add separated by comma'
          value={input.temperamentInput}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleTempInput(e)}
        />
        {/* Si hay errrs.name se agrega un elemento p */}
        {setCheckOrCross('temperamentInput')}
        <p>Selected:</p>
        <ul>
          {input.temperament.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
        <button type='submit'>Enviar</button>
      </div>
    </form>
  );
}
