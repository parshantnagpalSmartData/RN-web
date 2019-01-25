/*
FileName: index.js
Author :Suraj Sanwal
Description: Contains the Printable forms component
Date : 13 december 2018
*/

import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import _ from "lodash";

import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import SearchBar from "../../components/Common/SearchBar";
import CommonURLHandle from "../../components/CommonURLHandle";
import DivContainer from "../../components/Common/DivContainer";
import CustomModal from "../../components/CustomModal";
import PDFViewer from "./PDFViewer";

const customStyles = {
  content: {
    /*top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)"*/
    backgroundColor: "rgba(0,0,0,0.9)",
    top: "0",
    left: "0",
    right: "0",
    bottom: "0"
  }
};

class PrintableForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      isVisible: false
    };
  }

  componentDidMount() {
    this.props.appAction.fetchPrintableForms();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  onFormPress = _.debounce(formId => {
    let { appAction, componentId } = this.props;
    this.props.appAction.fetchBase64DataForPdf(formId, () => {
      if (Platform.OS == "web") {
        this.setState({ isVisible: true });
      } else {
        appAction.pushToParticularScreen(componentId, "PDFViewer");
      }
    });
  }, 1000);

  closeModal() {
    this.setState({ isVisible: false });
  }

  render() {
    let { searchText, isVisible } = this.state;
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
        <CommonURLHandle
          data={myForms}
          onFormPress={this.onFormPress}
          printable={true}
        />
        <CustomModal
          isVisible={isVisible}
          onBackdropPress={() => this.closeModal()}
          customStyles={customStyles}
        >
          <PDFViewer closeModal={() => this.closeModal()} />
        </CustomModal>
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
