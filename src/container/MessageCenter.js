import React, { Component } from "React";
import { View, StyleSheet, TouchableOpacity, Text } from "react-native";
import { connect } from "react-redux";
// import { bindActionCreators } from "redux";
import { ToastActionsCreators } from "react-native-redux-toast";
import * as appAction from "../actions";
import Header from "../components/common/Header";
// import UnderDevelopment from "../components/common/UnderDevelopment";
// import ToastNotification from "../components/common/ToastNotification";
class MessageCenter extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.dispatch(appAction.mergeOptions(this.props.componentId, true));
  };

  displayErrorToast = () => {
    this.props.dispatch(ToastActionsCreators.displayError("Error toast!"));
  };

  displayWarningToast = () => {
    this.props.dispatch(
      ToastActionsCreators.displayWarning("Warning toast!", 2000)
    );
  };

  displayInfoToast = () => {
    this.props.dispatch(ToastActionsCreators.displayInfo("Info toast!", 5000));
  };

  render() {
    return (
      <View style={Styles.containner}>
        <Header title={"Message Center"} onDrawerPress={this.onDrawerPress} />
        {/* <ToastNotification type={1} message={"hello"} /> */}
        <TouchableOpacity onPress={this.displayInfoToast}>
          <Text>Toastr display Info Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.displayWarningToast}>
          <Text>Toastr display Warning Toast</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={this.displayErrorToast}>
          <Text>Toastr display Error Toast</Text>
        </TouchableOpacity>
        {/* <UnderDevelopment /> */}
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
// const mapDispatchToProps = dispatch => ({
//   appAction: bindActionCreators(appAction, dispatch)
// });

export default connect(mapStateToProps)(MessageCenter);
