/*Socket common file */
/* eslint-disable */
"use strict";
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
// import { logOutUser } from "../actions/common/signin";
// import { setCurrentMap } from "../components/rider/rootMapView";
// import { socketDisconnected, syncDataAsync, nearByDriversList } from "../actions/rider/home";
// import { tripRequestUpdated, tripUpdated, driverLocationUpdated } from "../actions/rider/rideBooked";
// import "../UserAgent";

//store.dispatch(updateCart(response));

class DriverSocket {
  socket = null;
  navigator = null;
  isConnected = false;
  socketError = "Client/Server connection lost ";

  static socketInit() {
    const { dispatch, getState } = storeObj.store;
    if (!this.socket) {
      console.log("Intializing socket");
      this.socket = io(Connection.getBaseUrl(), {
        jsonp: false,
        transports: ["websocket"],
        query: `token=${getState().user.accessToken}`
      });
      // this.navigator = new Navigator();

      /****************************************************Soket Listining Events*********************************/

      /****************************************************Common*********************************/

      this.socket.on("connect", res => {
        console.log("Socket connected", this.socket, res);
        this.isConnected = this.socket.connected;
        dispatch({ type: Types.SET_SOCKET, payload: (this.socket && this.socket.id) || null });
      });

      this.socket.on("disconnect", res => {
        console.log("Socket disconnected", this.socket, res);
        this.isConnected = this.socket.connected;
        dispatch({ type: Types.SET_SOCKET, payload: (this.socket && this.socket.id) || null });
      });

      // socket.on("reconnect", () => {
      //   isConnected=true;
      //   dispatch({ type: Types.SET_SOCKET, payload: (socket && socket.id) || null });
      //   console.log("Re-connected");
      // });

      this.socket.on("unauthorizedToken", () => {
        //  dispatch(logOutUser());
      });
      this.socket.on("socketError", e => {
        console.log("socket error,", e);
        toastMessage(this.navigator, {
          type: Constants.AppCosntants.Notificaitons.Error,
          message: e.message
        });
        // Alert.alert(e);
      });

      this.socket.on("locationUpdated", res => {
        console.log("locationUpdated", res);
        if (res.success) {
          dispatch({
            type: Types.UPDATE_GPS_LOCATION,
            payload: res.data.gpsLoc
          });
          let region = {
            latitude: res.data && res.data.gpsLoc && res.data.gpsLoc[1],
            longitude: res.data && res.data.gpsLoc && res.data.gpsLoc[0]
          };
          getRegionForCoordinates([region]).then(region => {
            dispatch({
              type: Types.UPDATE_REGION,
              payload: region
            });
          });
          // toastNotification(this.navigator, { type: Constants.AppCosntants.Notificaitons.Success, message: res.message });
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /****************************************************driver*********************************/

      this.socket.on("requestDriver", res => {
        let meta = { ...getState().trip.meta };
        console.log("requestDriver", res);
        if (res.success) {
          console.log(meta, "meta here===", typeof meta.newRequestsCount);
          meta.newRequestsCount++;
          console.log(meta, "meta here===");
          toastNotification(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Success,
            message: res.message
          });
          dispatch({
            type: Types.UPDATE_RIDES_META,
            payload: meta.newRequestsCount
          });
          dispatch({
            type: Types.UPDATE_RIDES,
            payload: res.data
          });
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      this.socket.on("requestCancelledDriver", res => {
        console.log("requestCancelledDriver", res);
        let { trip } = getState();
        let meta = { ...trip.meta };
        let rides = [...trip.rides];
        if (res.success) {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
          let index = _.findIndex(rides, {
            _id: res.data._id
          });
          if (index != -1) {
            if (rides[index].tripRequestStatus === Constants.AppCosntants.RideStatus.Request) {
              meta.newRequestsCount--;
            }
            rides[index] = res.data;
            dispatch({
              type: Types.UPDATE_RIDES_META,
              payload: meta.newRequestsCount
            });
            dispatch({
              type: Types.REMOVE_RIDES,
              payload: rides
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      this.socket.on("requestAcceptedDriver", res => {
        console.log("requestAcceptedDriver,", res);
        let { trip } = getState();
        let meta = { ...trip.meta };
        let rides = [...trip.rides];
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
              type: Types.UPDATE_RIDES_META,
              payload: meta.newRequestsCount
            });
            dispatch({
              type: Types.REMOVE_RIDES,
              payload: rides
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /*Event fired to driver when driver rejects any request*/

      this.socket.on("requestRejectedDriver", res => {
        console.log("requestRejectedDriver,", res);
        let { trip } = getState();
        let meta = { ...trip.meta };
        let rides = [...trip.rides];
        if (res.success) {
          let index = _.findIndex(rides, {
            _id: res.data._id
          });
          if (index !== -1) {
            if (rides[index].tripRequestStatus === Constants.AppCosntants.RideStatus.Request) {
              meta.newRequestsCount--;
            }
            rides[index] = res.data;
            dispatch({
              type: Types.UPDATE_RIDES_META,
              payload: meta.newRequestsCount
            });
            dispatch({
              type: Types.REMOVE_RIDES,
              payload: rides
            });
          }
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /*Event fired when driver accept all/terminal all request*/
      /*Fired to the driver */
      this.socket.on("acceptedAllTripRequests", res => {
        console.log("acceptedAllTripRequests", res);
        if (res.success) {
          setTimeout(() => {
            dispatch(actions.getRideRequests(this.navigator));
          }, 500);
          this.navigator.dismissModal();
        } else {
          toastMessage(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /* event fired when shuttle location updated to server */
      this.socket.on("tripLocationUpdatedDriver", res => {
        console.log("tripLocationUpdatedDriver", res);
      });

      /* event fired event fired if terminal has requests as source */
      this.socket.on("completedTerminalRequests", res => {
        console.log("completedTerminalRequests", res);
        let currentTerminal = {
          _id: res.data.terminal,
          isContinueModal: false,
          isCompleteModal: false
        };
        if (res.success) {
          setTimeout(() => {
            if (res.data.newRequestsToEnroute) {
              currentTerminal = {
                _id: res.data.terminal,
                isContinueModal: true,
                isCompleteModal: false
              };
            }
            dispatch({ type: Types.UPDATE_CURRENT_TERMINAL, payload: currentTerminal });
          }, 500);
          this.navigator.dismissAllModals();
        }
      });

      /* event fired when all riders picked from the terminal */
      this.socket.on("enroutedTerminalRequests", res => {
        let { trip } = getState();
        let currentTerminal = { ...trip.currentTerminal };
        console.log("enroutedTerminalRequests", res);
        if (res.success) {
          setTimeout(() => {
            dispatch(actions.getRideRequests(this.navigator));
          }, 500);
          currentTerminal.isContinueModal = false;
          dispatch({ type: Types.UPDATE_CURRENT_TERMINAL, payload: currentTerminal });
          this.navigator.dismissModal();
          toastNotification(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Success,
            message: res.message
          });
        } else {
          toastNotification(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });

      /* event fired if terminal has requests as destination*/
      this.socket.on("completeTripOnTerminal", res => {
        console.log("completeTripOnTerminal", res);
        if (res.success) {
          this.navigator.dismissAllModals();
          let currentTerminal = {
            _id: res.data._id,
            isContinueModal: false,
            isCompleteModal: true
          };
          dispatch({ type: Types.UPDATE_CURRENT_TERMINAL, payload: currentTerminal });
          toastNotification(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Success,
            message: res.message
          });
        } else {
          toastNotification(this.navigator, {
            type: Constants.AppCosntants.Notificaitons.Error,
            message: res.message
          });
        }
      });
    }
    if (!this.navigator) {
      this.navigator = new Navigator();
      // dispatch({ type: Types.SET_NAVIGATOR, payload: this.navigator });
    }
  }

  /****************************************************Emit Events*********************************/

  /****************************************************Common*********************************/
  static disconnectSocket() {
    if (this.isConnected) {
      console.log("disconnecting socket");
      this.socket.disconnect();
      this.socket = null;
    }
  }

  static updateLocation(payload) {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      let { user } = getState();
      let { _id, userType } = user;
      let gpsLoc = [payload.longitude, payload.latitude];
      let payload = {
        userType,
        _id,
        gpsLoc
      };
      this.socket.emit("updateLocation", payload);
    }
  }

  /****************************************************driver*********************************/
  /**
   * @param tripRequestID is ride id going to accept
   */
  static driverAcceptTripRequest(tripRequestID) {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      const { response } = getState().trip;
      let payload = {
        tripRequestID,
        tripID: response && response._id,
        driverID: response && response.driverId
      };
      console.log("driverAcceptTripRequest", JSON.stringify(payload));
      this.socket.emit("driverAcceptTripRequest", payload);
    } else {
      alert(this.socketError);
    }
  }

  /**
   * @param tripRequestID is ride id going to reject
   */
  static driverRejectTripRequest(tripRequestID) {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      const { response } = getState().trip;
      let payload = {
        tripRequestID,
        tripID: response && response._id,
        driverID: response && response.driverId
      };
      console.log("driverRejectTripRequest", JSON.stringify(payload));
      this.socket.emit("driverRejectTripRequest", payload);
    } else {
      alert(this.socketError);
    }
  }

  //*All Requests accepted by the driver  *//
  /**
   *
   * @param {*} terminalID is ride id going to acceptOnTerminal
   */
  static acceptAllTripRequests(terminalID) {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      const { response } = getState().trip;
      let payload = {
        terminalID,
        tripID: response && response._id,
        driverID: response && response.driverId
      };
      console.log("acceptAllTripRequests", JSON.stringify(payload));
      this.socket.emit("acceptAllTripRequests", payload);
    } else {
      alert(this.socketError);
    }
  }

  //Driver will fire current location of the shuttle to the server
  static updateTripLocation(location) {
    if (this.isConnected) {
      const { dispatch, getState } = storeObj.store;
      const { user, trip } = getState();
      const { response } = trip;
      console.log("updating location");
      if (response && response._id) {
        let { latitude, longitude } = location;
        //updating shuttle location in the reducer in the driver trip
        dispatch({ type: Types.UPDATE_REGION, payload: location });
        let payload = {
          driverId: user._id,
          gpsLoc: [longitude, latitude],
          region: location
        };
        console.log("updateTripLocation", JSON.stringify(payload));
        this.socket.emit("updateTripLocation", payload);
      }
    }
  }

  /* event emit when driver press complete trip request event */
  static completeRides() {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      const { user, trip } = getState();
      const { response, currentTerminal } = trip;
      let payload = {
        driverID: user._id,
        tripID: response._id,
        terminalID: currentTerminal._id
      };
      console.log("completeTripRequestsTerminal", JSON.stringify(payload));
      this.socket.emit("completeTripRequestsTerm", payload);
    } else {
      alert(this.socketError);
    }
  }

  /* event emit when driver press continue ride trip request event */
  static continueRides() {
    if (this.isConnected) {
      const { getState } = storeObj.store;
      const { user, trip } = getState();
      const { response, currentTerminal } = trip;
      let payload = {
        driverID: user._id,
        tripID: response._id,
        terminalID: currentTerminal._id
      };
      console.log("enrouteTripRequestsTerminal", JSON.stringify(payload));
      this.socket.emit("enrouteTripRequestsTerm", payload);
    } else {
      alert(this.socketError);
    }
  }
  /****************************************************Admin*********************************/
}

reactMixin(DriverSocket.prototype, TimerMixin);

export default DriverSocket;
