/* 
      *                                                            *
    *****                                                        *****                             
      *                                                            *
        ==========================================================
        ==========                                      ==========
        ==========     Page for service hit loader      ==========
        ==========                                      ==========
        ==========================================================
      *                                                            *
    *****                                                        *****   
      *                                                            *
*/

import React, { Component } from "react";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import Constants from "../../constants";
import { connect } from "react-redux";
import DivContainer from "../Common/DivContainer";

class Loader extends Component {
  render() {
    let { loading } = this.props;
    // let loading=true;
    if (!loading) {
      return null;
    }
    return (
      <DivContainer style={Styles.mainContainer} className={"loader"}>
        <View style={Styles.innerView}>
          <ActivityIndicator size="large" color={Constants.Colors.Primary} />
        </View>
      </DivContainer>
    );
  }
}
const Styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: Constants.Colors.Transparent,
    position: "absolute",
    zIndex: 9999,
    top: 0,
    left: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: Constants.BaseStyle.DEVICE_HEIGHT,
    width: "100%"
  },
  innerView: { flex: 1, justifyContent: "center", alignItems: "center" }
});
const mapStateToProps = state => ({
  loading: state.app.loading
});
export default connect(
  mapStateToProps,
  null
)(Loader);
