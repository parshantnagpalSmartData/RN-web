/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the message center component
Date : 13 december 2018
*/

import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import UnderDevelopment from "../../components/Common/UnderDevelopment";
class MessageCenter extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  displayToast = () => {
    this.props.appAction.showToast(2, "this is an sucess toast");
  };
  displayErrorToast = () => {
    this.props.appAction.showToast(1, "This is an error toast");
  };
  render() {
    return (
      <View style={Styles.containner}>
        <Header title={"Message Center"} onDrawerPress={this.onDrawerPress} />
        <UnderDevelopment />
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageCenter);
