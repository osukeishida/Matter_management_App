import {createSlice} from '@reduxjs/toolkit';

export const loginSlice = createSlice({
  name: 'login',
  initialState: {
    token: '',
    username: '',
  },
  reducers: {
    login: (state, action) => {
      console.log(action);
      state.token = action.payload;
    },
    logout: (state, action) => {
      state.token = '';
    },
  },
});

export const {login, logout} = loginSlice.actions;

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
