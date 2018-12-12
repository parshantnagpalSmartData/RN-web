import React from "react";
import { AppRegistry, StyleSheet, Text, View } from "react-native";
import App from "./src";
// class App extends React.Component {
//   render() {
//     return <AppData />;
//   }
// }

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
