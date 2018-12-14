/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import Login from "./container/auth/Login";
import ForgotPassword from "./container/auth/ForgotPassword";
import MySchedule from "./container/MySchedule";

// global.isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent; // eslint-disable-line
console.disableYellowBox = true; // eslint-disable-line
export default class App extends Component {
  render() {
    return <MySchedule />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
