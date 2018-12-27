import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";

import { bindActionCreators } from "redux";
import * as appAction from "../actions";
import Header from "../components/common/Header";
import UnderDevelopment from "../components/common/UnderDevelopment";
// import ToastNotification from "../components/common/ToastNotification";
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
        {/* <TouchableOpacity onPress={this.displayToast}>
          <Text>Toastr display Info Toast</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={this.displayErrorToast}>
          <Text>Toastr display Error Toast</Text>
        </TouchableOpacity> */}
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
