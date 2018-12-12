/*Socket common file */
/* eslint-disable */
import { Alert } from "react-native";
import { Navigator } from "react-native-navigation";
import _ from "lodash";
import TimerMixin from "react-timer-mixin";
import reactMixin from "react-mixin";

import { storeObj } from "../../../store/setup";
import Connection from "../../../config/Connection";
import * as Types from "../../../actionTypes";
import * as actions from "../../../actions";
import { toastMessage, toastNotification } from "../../../config/navigators";
import Constants from "../../../constants";
import { getRegionForCoordinates } from "../../Maps";

const io = require("socket.io-client");

class AdminTripSocket {
  socket = null;
  navigator = null;
  isConnected = false;
  socketError = "Client/Server connection lost ";

  static socketInit() {
    const { dispatch, getState } = storeObj.store;
    const { listing, user } = getState();
    const { currentTrip } = listing;
    if (!this.socket) {
      console.log("Intializing socket");
      this.socket = io(Connection.getBaseUrl(), {
        jsonp: false,
        transports: ["websocket"],
        query: `token=${user.accessToken}&tripID=${currentTrip}`
      });

      /****************************************************Soket Listining Events*********************************/

      /****************************************************Common*********************************/

      this.socket.on("connect", res => {
        console.log("Socket connected", this.socket, res);
        this.isConnected = this.socket.connected;
        // dispatch({ type: Types.SET_SOCKET, payload: (this.socket && this.socket.id) || null });
      });

      this.socket.on("disconnect", res => {
        console.log("Socket disconnected", this.socket, res);
        this.isConnected = this.socket.connected;
        // dispatch({ type: Types.SET_SOCKET, payload: (this.socket && this.socket.id) || null });
      });

      this.socket.on("unauthorizedToken", () => {
        //  dispatch(logOutUser());
      });
      this.socket.on("socketError", e => {
        console.log("socket error,", e);
        toastMessage(this.navigator, {
          type: Constants.AppCosntants.Notificaitons.Error,
          message: e.message
        });
      });

      /***************Admin************************************************************/
      /**
       * event triggred when driver recived request
       */
      this.socket.on("requestAdmin", res => {
        console.log("requestAdmin", res);
        const { listing } = getState();
        let { tripData } = listing;
        let rides = [...tripData.rides];
        let meta = { ...tripData.meta };
        if (res.success) {
          rides.push(res.data);
          meta.newRequestsCount++;
        }
        dispatch({ type: Types.RIDE_REQUEST_LIST, payload: { rides, meta } });
      });

      /**
       * event triggred when driver recived request
       */
      this.socket.on("requestAcceptedAdmin", res => {
        console.log("requestAcceptedAdmin", res);
        const { listing } = getState();
        let { tripData } = listing;
        let rides = [...tripData.rides];
        let meta = { ...tripData.meta };
        if (res.success) {
          let index = _.findIndex(rides, {
            _id: res.data._id
          });
          if (index != -1) {
            if (rides[index].tripRequestStatus === Constants.AppCosntants.RideStatus.Request) {
              meta.newRequestsCount--;
            }
            rides[index] = res.data;
            dispatch({
              type: Types.RIDE_REQUEST_LIST,
              payload: { rides, meta }
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /**
       * event triggred when driver recived request
       */
      this.socket.on("acceptedAllTripRequestsAdmin", res => {
        console.log("acceptedAllTripRequestsAdmin", res);
        dispatch(actions.getRideRequests(this.navigator));
      });

      /**
       * event triggred when driver recived request
       */
      this.socket.on("requestRejectedAdmin", res => {
        console.log("requestRejectedAdmin", res);
        const { listing } = getState();
        let { tripData } = listing;
        let rides = [...tripData.rides];
        let meta = { ...tripData.meta };
        if (res.success) {
          let index = _.findIndex(rides, {
            _id: res.data._id
          });
          if (index != -1) {
            if (rides[index].tripRequestStatus === Constants.AppCosntants.RideStatus.Request) {
              meta.newRequestsCount--;
            }
            rides[index] = res.data;
            dispatch({
              type: Types.RIDE_REQUEST_LIST,
              payload: { rides, meta }
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /**
       * event triggred when driver recived request
       */
      this.socket.on("requestCancelledAdmin", res => {
        console.log("requestCancelledAdmin", res);
        const { listing } = getState();
        let { tripData } = listing;
        let rides = [...tripData.rides];
        let meta = { ...tripData.meta };
        if (res.success) {
          let index = _.findIndex(rides, {
            _id: res.data._id
          });
          if (index != -1) {
            if (rides[index].tripRequestStatus === Constants.AppCosntants.RideStatus.Request) {
              meta.newRequestsCount--;
            }
            rides[index] = res.data;
            dispatch({
              type: Types.RIDE_REQUEST_LIST,
              payload: { rides, meta }
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /**
       * event triggred when driver press continue ride button
       */
      this.socket.on("enroutedTerminalRequestsAdmin", res => {
        console.log("enroutedTerminalRequestsAdmin", res);
        if (res.success) {
          dispatch(actions.getRideRequests(this.navigator));
        }
      });

      /**
       * event triggred when driver press complete ride button
       */
      this.socket.on("completedTerminalRequestsAdmin", res => {
        console.log("completedTerminalRequestsAdmin", res);
        if (res.success) {
          dispatch(actions.getRideRequests(this.navigator));
        }
      });
    }
    if (!this.navigator) {
      this.navigator = new Navigator();
      // dispatch({ type: Types.SET_NAVIGATOR, payload: navigator });
    }
  }

  /****************************************************Emit Events*********************************/
  static disconnectSocket() {
    if (this.isConnected) {
      console.log("disconnecting socket");
      const { dispatch } = storeObj.store;
      dispatch({ type: Types.ADMIN_UPDATE_CURRENT_TRIP, payload: "" });
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

reactMixin(AdminTripSocket.prototype, TimerMixin);

export default AdminTripSocket;
