import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default class Tab2 extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>Tab 2</Text>
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
