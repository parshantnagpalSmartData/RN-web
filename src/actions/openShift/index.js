import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchOpenShift = () => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall(
      "nurses/openshifts?startDate=01/03/2018&enddate=12/27/2018",
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
          dispatch({ type: Types.OPEN_SHIFTS, payload: res.result.data });
        } else {
          dispatch(AppActions.stopLoader());
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
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
