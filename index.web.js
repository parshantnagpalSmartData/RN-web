import React from 'react';
import { AppRegistry, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppData from './src';
import setup from "./src/store/setup";
const store = setup()
class App extends React.Component {
  
  render() {
    return (
      <Provider store={store}>
      <View style={styles.box}>
        <Text style={styles.text}>Hello, world!</Text>
        <AppData/>  
      </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  box: { padding: 10 },
  text: { fontWeight: 'bold' }
});

AppRegistry.registerComponent('App', () => App);
AppRegistry.runApplication('App', { rootTag: document.getElementById('react-root') });