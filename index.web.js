import React from "react";
import { PersistGate } from 'redux-persist/integration/react'

import { AppRegistry, StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";
import AppData from "./src";
import setup from "./src/store/setup";

import Routes from "./src/config/routes";
const { persistor, store } = setup();
class App extends React.Component {
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
