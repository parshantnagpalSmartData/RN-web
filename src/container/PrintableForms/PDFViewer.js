/*
FileName: PDFViewer.js
Author :Suraj Sanwal
Description: Display the PDF's
Date : 13 december 2018
*/
import React, { Component } from "react";
import { View, StyleSheet, Platform } from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "axios";
import * as appAction from "../../actions";
import Header from "../../components/Common/Header";
import PDF from "../../components/PrintableForms/PDFViewer";
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
  render() {
    const { pageNumber, numPages } = this.state;
    return (
      <View style={Styles.containner}>
        <Header
          title={"Printable Forms"}
          hideDrawer
          onBackPress={this.onBackPress}
        />
        <DivContainer
          style={{
            height: "80%",
            width: "100%",
            ...Platform.select({
              web: {
                alignItems: "center",
                height: "100%"
              }
            })
          }}
        >
          <PDF
            onDocumentLoadSuccess={this.onDocumentLoadSuccess}
            loadError={this.loadError}
            numPages={numPages}
            pageNumber={pageNumber}
          />
        </DivContainer>
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
)(PDFViewer);
