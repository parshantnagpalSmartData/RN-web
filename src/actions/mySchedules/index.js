import RestClient from "../../helpers/RestClient";
// import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchMySchedules = token => {
  return dispatch => {
    dispatch(AppActions.startLoader());
    RestClient.getCall("nurses/schedules", token)
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
        } else {
          dispatch(AppActions.stopLoader());
          dispatch(
            AppActions.showToast(
              Constants.AppConstants.Notificaitons.Error,
              res.message
            )
          );
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
