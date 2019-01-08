import RestClient from "../../helpers/RestClient";
import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchMySchedules = (prevDate, nextDate, refresh = false) => {
  return (dispatch, getState) => {
    refresh
      ? dispatch(AppActions.startRefreshLoader())
      : dispatch(AppActions.startLoader());
    RestClient.getCall(
      "nurses/schedules?startDate=" + prevDate + "&endDate=" + nextDate,
      getState().user.token
    )
      .then(res => {
        if (res.status) {
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
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
          refresh
            ? dispatch(AppActions.stopRefreshLoader())
            : dispatch(AppActions.stopLoader());
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};

export const fetchPatientDetails = (patient_id, patientInfo) => {
  return (dispatch, getState) => {
    dispatch(AppActions.startLoader());
    RestClient.getCall(`patients/${patient_id}`, getState().user.token)
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
          patientInfo(res.result.patientDetail);
        } else {
          dispatch(AppActions.stopLoader());
          if (res.error === "Token expired") {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.error
              )
            );
            patientInfo(res.error);
            dispatch({ type: Types.RESET_USER });
            dispatch(AppActions.goAuth());
          } else {
            dispatch(
              AppActions.showToast(
                Constants.AppConstants.Notificaitons.Error,
                res.error
              )
            );
            patientInfo(res.message);
          }
        }
      })
      .catch(e => {
        dispatch(AppActions.stopLoader());
        console.warn("error", e); // eslint-disable-line
      });
  };
};
