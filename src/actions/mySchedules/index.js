import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchMySchedules = () => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    // dispatch({ type: Types.LOGIN_REQUEST });
    RestClient.getCall(
      "nurses/schedules?startDate=12/1/2018&endDate=12/27/2018",
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
          dispatch({ type: Types.ADD_MYSCHEDULE, payload: res.result.data });
        } else {
          if (res.error === "Token expired") {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.error
              )
            );
            dispatch({ type: Types.RESET_USER });
            dispatch(AppActions.goAuth());
          } else {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.message
              )
            );
          }
          dispatch(AppActions.stopLoader());
          // dispatch({ type: Types.LOGIN_FAIL });
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        // dispatch({ type: Types.LOGIN_FAIL });
        console.warn("error", e); // eslint-disable-line
      });
  };
};
