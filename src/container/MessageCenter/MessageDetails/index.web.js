/**
 * File : index.js
 * Description : Contains the container for messageDetails Web part
 * Date: 8 Feb 2019
 */

import React, { Component } from "react";
import { ScrollView, StyleSheet } from "react-native";
import MessageDetailsComp from "./MessageDetails";
import Constants from "../../../constants";
import DivContainer from "../../../components/Common/DivContainer";
class MessageDetails extends Component {
  render() {
    return (
      <DivContainer
        className={"rightMSGHeight"}
        styleWeb={Styles.conCatContaner}
        styleApp={{ flex: 1 }}
      >
        <ScrollView style={Styles.container}>
          <MessageDetailsComp {...this.props} />
        </ScrollView>
      </DivContainer>
    );
  }
}
const Styles = StyleSheet.create({
  container: {
    flex: 1
  },
  conCatContaner: {
    height: Constants.BaseStyle.DEVICE_WIDTH * 0.7
  }
});
export default MessageDetails;
