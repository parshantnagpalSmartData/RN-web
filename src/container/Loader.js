import React from "react";
import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  ActivityIndicator
} from "react-native";

export default class Loader extends React.Component {
  componentWillUnmount() {
    console.log("unmount");
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size={"large"} />
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
