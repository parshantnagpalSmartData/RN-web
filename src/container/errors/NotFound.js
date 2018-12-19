import React from "react";
import { View, Text, StyleSheet } from "react-native";

class NotFound extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>404</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
export default NotFound;
