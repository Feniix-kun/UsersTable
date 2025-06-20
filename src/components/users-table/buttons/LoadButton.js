import React from 'react';
import { useDispatch } from 'react-redux';
import { loadUsers } from '../actions';

import './ButtonsStyle.css';

export function LoadButton({ clearEditing }) {
  const dispatch = useDispatch();

  const handleLoad = () => {
    dispatch(loadUsers());
    clearEditing();
  };

  return (
    <button className='all-buttons' onClick={handleLoad}>Загрузить данные</button>
  );
}

export default LoadButton;