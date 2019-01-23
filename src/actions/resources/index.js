/*
FileName: index.js
Author : Parshant Nagpal
Description: conatins all resources related actions for app 
Date : 14 January 2019
*/

import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";

/**
 * Fetch the all resources urls that we have to show on click
 */

export const fetchResourcesUrls = () => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall("nurseresources", getState().user.token)
      .then(res => {
        if (res.status) {
          dispatch({ type: Types.RESOURCES_DATA, payload: res.result.data });
        } else {
          dispatch(AppActions.checkLogin(res));
        }
        dispatch(AppActions.stopLoader());
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
