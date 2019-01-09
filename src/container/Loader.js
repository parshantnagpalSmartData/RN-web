/*
FileName: index.js
Author :Parshant Nagpal
Description: contains the Loader component
Date : 13 december 2018
*/

import React from "react";
import { View, Text, StyleSheet } from "react-native";

class Loader extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Loading</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  welcome: {
    fontSize: 28
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Loader;
