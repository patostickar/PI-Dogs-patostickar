import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALERT } from '../redux/actions';
import { createDog } from '../redux/actions/createDog.js';
import Navbar from './Navbar.jsx';
import style from './styles/CreateDog.module.css';

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
  const alert = useSelector((state) => state?.alertMessage);
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();
  // const alertMessage = useSelector((state) => state.alertMessage);

  // Hashmap of validations
  function validateInput(name, value) {
    const inputs = {
      // if any condition is true --> invalid response
      // inputs are sent as strings (HTMl behaviour)
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
        if (value === '') return;
        return +value <= 0 || !Number.isInteger(+value);
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
    // if (!image)
    //   dog.image =
    //     'https://media.ambito.com/p/ab2a83915e3c3e9fdc127a9f5cae866e/adjuntos/239/imagenes/038/976/0038976244/1200x1200/smart/dogejpg.jpg';
    if (life_span) dog.life_span = parseFloat(life_span);
    dispatch(createDog(dog));
  };

  useEffect(() => {
    if (/created/.test(alert))
      setInput({
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
  }, [alert]);

  // Check if input has been touched and if it has errors
  // Differentiate if error is false or hasn't been checked
  const icon = (input) => {
    return touched[input] // touched?
      ? errors[input] // has errors?
        ? `fa-solid fa-xmark ${style.xmark}`
        : errors.hasOwnProperty(input) && errors[input] === false // no error or empty?
        ? `fa-solid fa-check ${style.check}`
        : null
      : null;
  };

  return (
    <>
      <Navbar />
      <div className={style.container}>
        <div className={style.picture}></div>
        <div className={style.inputs}>
          <form onSubmit={handleSubmit}>
            <div>
              <label className={style.label} htmlFor='name'>
                Name:
              </label>
              <div className={style.row}>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='text'
                    name='name'
                    id='name'
                    placeholder='Shiba Inu *'
                    value={input.name}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  ></input>
                  <i className={icon('name')}></i>
                  {/* Si hay errrs.name se agrega un elemento p */}
                </div>
              </div>

              <label className={style.label} htmlFor='height_min'>
                Height:
              </label>
              <div className={style.row}>
                {/* Si hay errors.name se agrega la clase danger */}
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='number'
                    name='height_min'
                    id='height_min'
                    placeholder='Min *'
                    min='0'
                    value={input.height_min}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('height_min')}></i>
                </div>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='number'
                    name='height_max'
                    id='height_max'
                    placeholder='Max *'
                    min='0'
                    value={input.height_max}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('height_max')}></i>
                </div>
              </div>

              <label className={style.label} htmlFor='weight_min'>
                Weight:
              </label>
              <div className={style.row}>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='number'
                    name='weight_min'
                    id='weight_min'
                    placeholder='Min *'
                    min='0'
                    value={input.weight_min}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('weight_min')}></i>
                </div>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='number'
                    name='weight_max'
                    id='weight_max'
                    placeholder='Max *'
                    min='0'
                    value={input.weight_max}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('weight_max')}></i>
                </div>
              </div>

              <label className={style.label} htmlFor='life_span'>
                Life Span:
              </label>
              <div className={style.row}>
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='number'
                    name='life_span'
                    id='life_span'
                    placeholder='1 - 99'
                    min='1'
                    value={input.life_span}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('life_span')}></i>
                </div>
              </div>

              <label className={style.label} htmlFor='image'>
                Image URL:
              </label>
              <div className={style.row}>
                {/* Si hay errors.name se agrega la clase danger */}
                <div className={style.inputBox}>
                  <input
                    className={style.input}
                    type='url'
                    name='image'
                    id='image'
                    placeholder='Provide a valid image URL'
                    value={input.image}
                    onChange={(e) => handleChange(e)}
                    onBlur={(e) => handleOnBlur(e)}
                  />
                  {/* Si hay errrs.name se agrega un elemento p */}
                  <i className={icon('image')}></i>
                </div>
              </div>

              <label className={style.label}>Temperaments</label>
              <div className={style.row}>
                <div className={style.col}>
                  <label className={style.label}>Choose:</label>
                  <select
                    className={style.select}
                    multiple
                    onChange={handleTempList}
                  >
                    {temps?.map((t) => (
                      <option value={t.name} key={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className={style.col}>
                  <label className={style.label} htmlFor='temperamentInput'>
                    Or create:
                  </label>
                  {/* Si hay errors.name se agrega la clase danger */}
                  <div className={style.inputBox}>
                    <input
                      className={style.input}
                      type='text'
                      name='temperamentInput'
                      id='temperamentInput'
                      placeholder='Add separated by comma'
                      value={input.temperamentInput}
                      onChange={(e) => handleChange(e)}
                      onBlur={(e) => handleTempInput(e)}
                    />
                    {/* Si hay errrs.name se agrega un elemento p */}
                    <i
                      className={icon('temperamentInput')}
                      style={{ top: '14px' }}
                    ></i>
                  </div>
                </div>
              </div>

              <div className={style.row}>
                <ul>
                  {input.temperament.map((t) => (
                    <li key={t} className={style.temperaments}>
                      {t}
                    </li>
                  ))}
                </ul>
              </div>

              <input
                type='submit'
                value='Create'
                className={style.input}
              ></input>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
