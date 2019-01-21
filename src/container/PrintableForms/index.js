/*
FileName: index.js
Author :Suraj Sanwal
Description: Contains the Printable forms component
Date : 13 december 2018
*/

import React, { Component } from "React";
import { View, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import SearchBar from "../../components/Common/SearchBar";
import RenderPrintableForms from "../../components/PrintableForms";
import DivContainer from "../../components/Common/DivContainer";

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

  onFormPress = _.debounce(() => {
    let { appAction, componentId } = this.props;
    appAction.pushToParticularScreen(componentId, "PDFViewer");
  }, 1000);

  render() {
    let { searchText } = this.state;
    let { myForms } = this.props && this.props.forms;
    return (
      <View style={Styles.containner}>
        <Header title={"Printable Forms"} onDrawerPress={this.onDrawerPress} />
        <DivContainer className={"Searchbar"}>
          <SearchBar
            value={searchText}
            onChangeText={searchText => this.setState({ searchText })}
          />
        </DivContainer>
        <RenderPrintableForms data={myForms} onFormPress={this.onFormPress} />
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
)(PrintableForms);
