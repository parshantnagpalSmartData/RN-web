
import RestClient from "../../helpers/RestClient";
// import * as Types from "../../actionTypes";
import * as AppActions from "../app";
import Constants from "../../constants";

export const fetchMySchedules = token => {
  return dispatch => {
    dispatch(AppActions.startLoader());
    // dispatch({ type: Types.LOGIN_REQUEST });
    RestClient.getCall("nurses/schedules", token)
      .then(res => {
        if (res.status) {
          dispatch(AppActions.stopLoader());
          // console.log("response", res);
          // dispatch({ type: Types.LOGIN_SUCESS });
          // dispatch({ type: Types.LOGIN });
          // dispatch({ type: Types.SAVE_USER, payload: res.result });
          // dispatch(AppActions.pushTParticulatScreen(componentId, "OTPScreen"));
          // dispatch(
          //   AppActions.showToast(
          //     Constants.AppConstants.Notificaitons.Success,
          //     res.message
          //   )
          // );
        } else {
          dispatch(AppActions.stopLoader());
          // dispatch({ type: Types.LOGIN_FAIL });
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
        // dispatch({ type: Types.LOGIN_FAIL });
        console.warn("error", e); // eslint-disable-line
      });
  };
};
