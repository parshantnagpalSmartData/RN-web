/*
AuthorName : Suraj Sanwal
FileName: reducer.js
Description: Contains the reducer regarding the schedule
Date : 9 Jan 2019 
*/

import _ from "lodash";

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
        openShift: state.openShift.concat(action.payload.data),
        openShiftMeta: action.payload.pagingMetadata
      };
    case Types.ADD_MYSCHEDULE:
      return {
        ...state,
        mySchedules: state.mySchedules.concat(action.payload.data),
        myScheduleMeta: action.payload.pagingMetadata
      };
    case Types.POTIENTIAL_CASES:
      return {
        ...state,
        potientialCases: state.potientialCases.concat(action.payload.data),
        potientialCasesMeta: action.payload.pagingMetadata
      };
    case Types.CLEAR_POTIENTIAL_DATA:
      return {
        ...state,
        potientialCases: [],
        potientialCasesMeta: {}
      };
    case Types.CLEAR_OPEN_SHIFT:
      return {
        ...state,
        openShift: [],
        openShiftMeta: {}
      };
    case Types.CLEAR_MY_SCHEDULE:
      return {
        ...state,
        mySchedules: [],
        myScheduleMeta: {}
      };
    case Types.UPDATE_OPENSHIFT_LIKE_INDICATOR: {
      let openShift = [...state.openShift];
      let index = _.findIndex(openShift, {
        SchedID: action.payload
      });
      let openShift_Index = { ...openShift[index] };
      openShift_Index.LikeIndicator = !openShift_Index.LikeIndicator;
      openShift[index] = openShift_Index;
      return {
        ...state,
        openShift
      };
    }
    case Types.UPDATE_POTIENTIAL_LIKE_INDICATOR: {
      let potientialCases = [...state.potientialCases];
      let index = _.findIndex(potientialCases, {
        CaseID: action.payload
      });
      let potientialCases_Index = { ...potientialCases[index] };
      potientialCases_Index.LikeIndicator = !potientialCases_Index.LikeIndicator;
      potientialCases[index] = potientialCases_Index;
      return {
        ...state,
        potientialCases: [...potientialCases]
      };
    }
    default:
      return state;
  }
};

export default Schedule;
