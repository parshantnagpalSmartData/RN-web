/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the user
Date : 11 Sept 2018  
*/

import * as Types from "../../actionTypes";
const initialState = {
  mySchedules: [],
  openShift: [],
  potantialCases: []
};
const Schedule = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_SHIFTS:
      return { ...state, openShift: action.payload };
    case Types.ADD_MYSCHEDULE:
      return { ...state, mySchedules: action.payload };
    default:
      return state;
  }
};

export default Schedule;
