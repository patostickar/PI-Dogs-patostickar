import React from 'react';
import { useHistory } from 'react-router-dom';

export default function GoBackBtn() {
  const history = useHistory();

  return <button onClick={history.goBack}>⬅️</button>;
}
