/*
FileName: PDFViewer.js
Author :Suraj Sanwal
Description: Display the PDF's
Date : 13 december 2018
*/
import React, { Component } from "react";
import { View, StyleSheet, Platform, Text } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "axios";
import * as appAction from "../../actions";
import PDF from "../../components/CommonURLHandle/PDFViewer";
import DivContainer from "../../components/Common/DivContainer";

class PDFViewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      numPages: null,
      pageNumber: 1
    };
  }
  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  }; // eslint-disable-next-line
  loadError = errr => {
    //  console.log("error",errr)
  };
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };
  downloadFile = () => {
    axios({
      //https://cors-anywhere.herokuapp.com/http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf
      url:
        "https://cors-anywhere.herokuapp.com/http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
      method: "GET",
      responseType: "blob" // important
    }).then(response => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "file.pdf");
      document.body.appendChild(link);
      link.click();
    });
  };
  cancelButton() {
    if (Platform.OS == "Web") {
      return (
        <View>
          <Text>close</Text>
        </View>
      );
    }
    return null;
  }
  render() {
    const { pageNumber, numPages } = this.state;
    let { base64PrintableData } = this.props.forms;
    return (
      <DivContainer styleApp={Styles.pdfStyle} styleWeb={Styles.pdfStyle}>
        {this.cancelButton()}
        <PDF
          base64Data={base64PrintableData}
          onDocumentLoadSuccess={this.onDocumentLoadSuccess}
          loadError={this.loadError}
          numPages={numPages}
          pageNumber={pageNumber}
        />
      </DivContainer>
    );
  }
}

const Styles = StyleSheet.create({
  containner: {
    flex: 1
  },
  pdfStyle: {
    height: "100%",
    width: "100%",
    ...Platform.select({
      web: {
        alignItems: "center",
        height: "100%"
      }
    })
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
)(PDFViewer);
