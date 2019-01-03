/*
AuthorName : Parshant Nagpal
FileName: reducer.js
Description: Contains the reducer regarding my schedules
Date : 3 Jan 2019  
*/

import * as Types from "../../actionTypes";
const initialState = {
  mySchedules: []
};

const mySchedules = (state = initialState, action) => {
  switch (action.type) {
    case Types.ADD_MYSCHEDULE:
      return { ...state, mySchedules: action.payload };
    case Types.RESET_USER:
      return {
        ...initialState
      };
    default:
      return state;
  }
};

export default mySchedules;
