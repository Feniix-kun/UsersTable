export const updateUser = (id, name, id_type) => (dispatch, getState) => {
  dispatch({
    type: 'users/update',
    payload: { id, name, id_type },
  });

  const updatedUsers = getState().users;
  dispatch({
    type: 'users/load',
    payload: updatedUsers,
  });
};

export const resetUsers = () => ({
  type: 'users/reset',
});

export const loadUsers = () => (dispatch, getState) => {
  const savedUsers = getState().users; 
  dispatch({
    type: 'users/load',
    payload: savedUsers,
  });
};