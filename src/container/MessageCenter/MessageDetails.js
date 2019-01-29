import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";

class MessageDetails extends Component {
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };
  render() {
    return (
      <View style={Styles.container}>
        <Header
          title={"Message Details"}
          hideDrawer
          onBackPress={this.onBackPress}
        />
        <Text>Hello</Text>
      </View>
    );
  }
}

const Styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
const mapStateToProps = state => ({
  user: state.user,
  app: state.app,
  messages: state.messages
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MessageDetails);
