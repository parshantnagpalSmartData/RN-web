/*
AuthorName : Parshant Nagpal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  isLoggedIn : false
};

export default user = (state = initialState, action) => {
  switch (action.type) {
    case Types.LOGIN:
      return { ...state, isLoggedIn : true };
    case Types.LOGOUT:
     return { ...state, isLoggedIn : false };  
    default:
     return state;
  }
};
