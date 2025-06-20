import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { initialUsers, initialUsersType } from '../data';

function initialUsersReducer(state = initialUsers) {
  return state;
}

function usersReducer(state = initialUsers, action) {
  switch (action.type) {
    case 'users/update':
      return state.map(u =>
        u.id === action.payload.id ? { ...u, ...action.payload } : u
      );
    default:
      return state;
  }
}

function displayedUsersReducer(state = initialUsers, action) {
  switch (action.type) {
    case 'users/reset':
      return initialUsers;
    case 'users/load':
      return action.payload;
    default:
      return state;
  }
}

function usersTypeReducer(state = initialUsersType, action) {
  return state;
}

const rootReducer = combineReducers({
  initialUsers: initialUsersReducer,
  users: usersReducer,
  displayedUsers: displayedUsersReducer,
  usersType: usersTypeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});