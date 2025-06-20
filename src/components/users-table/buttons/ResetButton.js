import React from 'react';
import { useDispatch } from 'react-redux';
import { resetUsers } from '../actions';

import './ButtonsStyle.css';

export function ResetButton({ clearEditing }) {
  const dispatch = useDispatch();

  const handleReset = () => {
    dispatch(resetUsers());
    clearEditing();
  };

  return (
    <button className='all-buttons' onClick={handleReset}>Сбросить данные</button>
  );
}

export default ResetButton;