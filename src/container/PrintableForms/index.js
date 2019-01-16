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
import axios from "axios";

import * as appAction from "../../actions";
import Header from "../../components/common/Header";
import SearchBar from "../../components/common/SearchBar";
// import Constants from "../../constants";
import Pdf from "../../components/PrintableForms";
// import { Document, Page } from 'react-pdf/dist/entry.webpack';;
// import 'react-pdf/dist/Page/AnnotationLayer.css';
class PrintableForms extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchText: "",
      numPages: null,
      pageNumber: 1
    };
  }

  componentDidMount() {
    this.props.appAction.fetchPrintableForms();
  }

  onDrawerPress = () => {
    this.props.appAction.mergeOptions(this.props.componentId, true);
  };

  onDocumentLoadSuccess = ({ numPages }) => {
    this.setState({ numPages });
  };// eslint-disable-next-line
  loadError = errr => {
    //  console.log("error",errr)
  };
  downloadFile = () => {
    axios({
      url: "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
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
    let { searchText } = this.state;
    const { pageNumber, numPages } = this.state;
    return (
      <View style={Styles.containner}>
        <Header title={"Printable Forms"} onDrawerPress={this.onDrawerPress} />
        <SearchBar
          value={searchText}
          onTextChange={searchText => this.setState({ searchText })}
        />
        {/* <TouchableOpacity>
          <Text onPress={()=>{
            this.downloadFile()
          }}>
          download
          </Text>
        </TouchableOpacity> */}
        <Pdf
          onDocumentLoadSuccess={this.onDocumentLoadSuccess}
          loadError={this.loadError}
          numPages={numPages}
          pageNumber={pageNumber}
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
