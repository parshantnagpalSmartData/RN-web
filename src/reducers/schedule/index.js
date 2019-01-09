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
  potientialCases: [],
  myScheduleMeta: {},
  openShiftMeta: {},
  potientialCasesMeta: {}
};
const Schedule = (state = initialState, action) => {
  switch (action.type) {
    case Types.OPEN_SHIFTS:
      return {
        ...state,
        openShift: action.payload.data,
        openShiftMeta: action.payload.pagingMetadata
      };
    case Types.ADD_MYSCHEDULE:
      return {
        ...state,
        mySchedules: action.payload.data,
        myScheduleMeta: action.payload.pagingMetadata
      };
    case Types.POTIENTIAL_CASES:
      return {
        ...state,
        potientialCases: action.payload.data,
        potientialCasesMeta: action.payload.pagingMetadata
      };
    default:
      return state;
  }
};

export default Schedule;
