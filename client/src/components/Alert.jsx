import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlertMessage } from '../redux/actions';
import style from './styles/Alert.module.css';

export default function Alert(props) {
  const [visible, setVisible] = useState(true);
  const alertMessage = useSelector((state) => state.alertMessage);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setVisible(false);
      dispatch(clearAlertMessage());
    }, props.delay);
    // avoid memory leak error
    return () => {
      setVisible(false);
    };
  }, [dispatch, props.delay]);

  return visible ? <div className={style.alert}>{alertMessage}</div> : <div />;
}
