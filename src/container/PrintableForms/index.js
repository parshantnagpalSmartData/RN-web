/*
FileName: index.js
Author :Parshant Nagpal
Description: Contains the Printable forms component
Date : 13 december 2018
*/

import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as appAction from "../../actions";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";

class PrintableForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentDidMount() {
    this.props.appAction.fetchPrintableForms();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  render() {
    let { searchText } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Printable Forms"} onDrawerPress={this.onDrawerPress} />
        <SearchBar
          value={searchText}
          onTextChange={searchText => this.setState({ searchText })}
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
)(PrintableForms);
