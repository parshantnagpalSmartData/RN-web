import React, { Component } from "react";
import { PersistGate } from "redux-persist/integration/react";

import { AppRegistry } from "react-native";
import { Provider } from "react-redux";
import setup from "./src/store/setup";

import Routes from "./src/config/routes";
const { persistor, store } = setup();
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Routes />
        </PersistGate>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
