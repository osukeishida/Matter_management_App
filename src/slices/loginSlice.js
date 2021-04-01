import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    username: '',
    role: false,
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = '';
    },
    isadmin: (state, action) => {
      console.log(action);
      state.role = action.payload;
    },
  },
});

export const {login, logout, isadmin} = loginSlice.actions;

export const {reducer: loginReducer} = loginSlice;

// action = { type: "LOGIN", payload: "ここについかじょうほう"};

// console.log(loginSlice);

// {
//     action: {
//         login: ...,
//     },
//     reducer: {
//     }
// }
