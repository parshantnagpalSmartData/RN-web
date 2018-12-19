/*
AuthorName : Parshant Nagpal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  isLoggedIn: false
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case Types.SAVE_USER:
      return { ...state, ...action.payload };
    case Types.LOGIN:
      return { ...state, isLoggedIn: true };
    case Types.LOGOUT:
      return { ...state, isLoggedIn: false };
    case Types.RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default user;
