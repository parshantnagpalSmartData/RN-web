/*
FileName: index.js
Author :Suraj Sanwal
Description: Contains the Printable forms component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Linking, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import SearchBar from "../../components/Common/SearchBar";
import CommonURLHandle from "../../components/CommonURLHandle";
import DivContainer from "../../components/Common/DivContainer";

class Resources extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: ""
    };
  }

  componentDidMount() {
    this.props.appAction.fetchResourcesUrls();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  onFormPress = _.debounce(url => {
    if (Platform.OS === "web") {
      var win = window.open(url, "_blank");
      win.focus();
    } else {
      // eslint-disable-next-line
      Linking.openURL(url).catch(err => {
        // console.error("An error occurred", err)
      });
    }
  }, 1000);

  render() {
    let { searchText } = this.state;
    let { myUrls } = this.props && this.props.forms;
    return (
      <View style={Styles.containner}>
        <Header title={"Resources"} onDrawerPress={this.onDrawerPress} />
        <DivContainer className={"Searchbar"}>
          <SearchBar
            value={searchText}
            onChangeText={searchText => this.setState({ searchText })}
          />
        </DivContainer>
        <CommonURLHandle
          data={myUrls}
          onFormPress={this.onFormPress}
          printable={false}
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
  app: state.app,
  forms: state.forms
});
const mapDispatchToProps = dispatch => ({
  appAction: bindActionCreators(appAction, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Resources);
