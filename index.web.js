/*
Name : Parshant Nagpal  
File Name : index.js
Description : Contains the Root component for web
Date : 16 Jan 2019
*/

import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import setup from "./src/store/setup";

import Routes from "./src/config/Routes";
import Loader from "./src/components/Common/Loader";
import ToastNotification from "./src/components/Common/ToastNotification";
import * as appAction from "./src/actions";
const { persistor, store } = setup();
// import "./src/container/html/style.css";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deviceWidth: window.innerWidth
    };
  }

  /**
   * Event listener watches the width of web
   */
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions.bind(this));
  }
  /**
   * update the width of web on reducer
   */
  updateDimensions() {
    store.dispatch(appAction.setWebWidth(window.innerWidth));
  }
  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={<Loader />} persistor={persistor}>
          <Routes />
          {/* <Loader /> */}
          <ToastNotification />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
