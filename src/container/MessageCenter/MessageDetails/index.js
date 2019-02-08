/**
 * File : index.js
 * Description : Contains the conatiner for messageDetails for app
 * Date: 8 Feb 2019
 */

import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import MessageDetailsComp from "./MessageDetails";
class MessageDetails extends Component {
  render() {
    return (
      <View style={Styles.container}>
        <MessageDetailsComp {...this.props} />
      </View>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
export default MessageDetails;
