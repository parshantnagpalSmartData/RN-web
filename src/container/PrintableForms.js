import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../actions";
import Header from "../components/common/Header";
import UnderDevelopment from "../components/common/UnderDevelopment";

class PrintableForms extends Component {
  constructor(props) {
    super(props);
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  render() {
    return (
      <View style={Styles.containner}>
        <Header title={"Printable Forms"} onDrawerPress={this.onDrawerPress} />
        <UnderDevelopment />;
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
)(PrintableForms);
