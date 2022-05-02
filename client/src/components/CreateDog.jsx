import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { GET_ALERT } from '../redux/actions';

export default function Form() {
  const [input, setInput] = useState({
    username: '',
    password: '',
  });
  const [touched, setTouched] = useState({});
  const [errors, setErrors] = useState({});
  const dispatch = useDispatch();

  // Hashmap of validations
  function validateInput(name, value) {
    const inputs = {
      username: (value) => {
        return !/\S+@\S+\.\S+/.test(value);
      },
      password: (value) => {
        return !/(?=.*[0-9])/.test(value);
      },
    };

    // required inputs
    if (name === 'username' || name === 'password') {
      return !value
        ? `${name} is required`
        : inputs[name](value)
        ? `${name} is invalid`
        : false;
    } else {
      // optional inputs
      return inputs[name](value) ? `${name} is invalid` : false;
    }
  }

  // Set if input has been touched
  const handleOnBlur = (e) => {
    setTouched({ ...touched, [e.target.name]: true });
  };

  // Set state of input value and errors if any
  const handleChange = (event) => {
    const { name, value } = event.target;

    setErrors({ ...errors, [name]: validateInput(name, value) });
    setInput({ ...input, [name]: value });
  };

  // Validate everything onSubmit (in case it is submitted before any interactions)
  function validateAll(inputs) {
    let errors = {};
    for (const input in inputs) {
      errors[input] = validateInput(input, inputs[input]);
    }
    return errors;
  }

  // tengo que enviar dos veces para que salga el dispatch
  const handleSubmit = (event) => {
    event.preventDefault();

    const errorList = Object.values(validateAll(input)).filter(
      (error) => error !== false
    );
    console.log(errorList.join(' & '));

    // if (errorList.length)
    //   dispatch({ type: GET_ALERT, payload: errorList.join(', ') });
  };

  // Check if input has been touched and if it has errors
  // Differentiate if error is false or hasn't been checked
  const setCheckOrCross = (input) => {
    return touched[input]
      ? errors[input]
        ? '❌'
        : errors.hasOwnProperty(input) && errors[input] === false
        ? '✅'
        : '❌'
      : null;
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Username:</label>
        {/* Si hay errors.username se agrega la clase danger */}
        <input
          type='text'
          name='username'
          value={input.username}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {/* Si hay errrs.username se agrega un elemento p */}
        {setCheckOrCross('username')}
        <label>Password:</label>
        <input
          type='password'
          name='password'
          value={input.password}
          onChange={(e) => handleChange(e)}
          onBlur={(e) => handleOnBlur(e)}
        />
        {setCheckOrCross('password')}
        <button type='submit'>Enviar</button>
      </div>
    </form>
  );
}

/*
  function validateUsername(username) {
    if (!username) {
      return 'Username is required';
    } else if (!/\S+@\S+\.\S+/.test(username)) {
      return 'Username is invalid';
    }
  }

  function validatePassword(password) {
    if (!password) {
      return 'Password is required';
    } else if (!/(?=.*[0-9])/.test(password)) {
      return 'Password is invalid';
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'username') {
      setErrors({ ...errors, [name]: validateUsername(value) });
    }
    if (name === 'password') {
      setErrors({ ...errors, [name]: validatePassword(value) });
    }

    setInput({ ...input, [name]: value });
  };
  */
