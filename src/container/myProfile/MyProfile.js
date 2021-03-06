/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the My Profile component
Date : 13 december 2018
*/

import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/common/Header";
import UnderDevelopment from "../../components/common/UnderDevelopment";
import AuthButton from "../../components/common/AuthButton";
import Constants from "../../constants";
import { moderateScale } from "../../helpers/ResponsiveFonts";

class MyProfile extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  resetPassword = () => {
    let { appAction, componentId } = this.props;
    appAction.pushTParticulatScreen(componentId, "ResetPassword");
  };

  render() {
    return (
      <View style={Styles.containner}>
        <Header title={"My Profile"} onDrawerPress={this.onDrawerPress} />
        <UnderDevelopment />
        <AuthButton
          buttonName={"Reset Password"}
          gradientColors={Constants.Colors.ButtonGradients}
          onPress={this.resetPassword}
          gradientStyle={{ borderRadius: moderateScale(10) }}
        />
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
)(MyProfile);
