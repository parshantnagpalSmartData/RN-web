/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the schedule
Date : 9 Jan 2019 
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
