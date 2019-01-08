import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchOpenShift = (startDate, enddate, refresh = false) => {
  return (dispatch, getState) => {
    refresh
      ? dispatch(AppActions.startRefreshLoader())
      : dispatch(AppActions.startLoader());
    RestClient.getCall(
      `nurses/openshifts?startDate=${startDate}&enddate=${enddate}`,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
          dispatch({ type: Types.OPEN_SHIFTS, payload: res.result.data });
        } else {
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
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

export const openshiftsLike = (shiftId, sucess) => {
  return (dispatch, getState) => {
    // dispatch(AppActions.startLoader());
    RestClient.restCall(
      `nurses/openshifts/${shiftId}/like`,
      null,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          // dispatch(AppActions.stopLoader());
          sucess();
        } else {
          // dispatch(AppActions.stopLoader());
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
