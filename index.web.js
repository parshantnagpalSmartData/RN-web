import React from 'react';

import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppData from './src';
import setup from "./src/store/setup";
const store = setup()
import Routes from './src/config/routes';

class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
         <Routes/>
      </Provider>
    );
  }
}

AppRegistry.registerComponent("App", () => App);
AppRegistry.runApplication("App", {
  rootTag: document.getElementById("react-root")
});
