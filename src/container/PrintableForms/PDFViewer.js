/*
FileName: PDFViewer.js
Author :Suraj Sanwal
Description: Display the PDF's
Date : 13 december 2018
*/
import React, { Component } from "react";
import {
  StyleSheet,
  Platform,
  TouchableOpacity,
  Image,
  Button
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import axios from "axios";
import { printPDF } from "../../helpers/print";
import * as appAction from "../../actions";
import PDF from "../../components/PDFViewer";
import DivContainer from "../../components/Common/DivContainer";
import { moderateScale } from "../../helpers/ResponsiveFonts";
import Constants from "../../constants";
import Header from "../../components/Common/Header";

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
  // printPDF = async () => {
  //   let { base64PrintableData } = this.props.forms;

  //   const dirs = RNFetchBlob.fs.dirs;

  //   var path = dirs.DocumentDir + "/data.pdf";

  //   RNFetchBlob.fs
  //     .writeFile(path, base64PrintableData.file, "base64")
  //     .then(async () => {
  //       await RNPrint.print({ filePath: dirs.DocumentDir + "/data.pdf" });
  //     });

  //   // await RNPrint.print({ filePath: 'http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf' })
  //   // await RNPrint.print({ filePath: "data:application/pdf;base64," + base64PrintableData.file })
  // };

  /**
   * contains cancel button for web and header for app
   */
  cancelButtonAndHeaders(filename) {
    if (Platform.OS == "web") {
      let { closeModal } = this.props;
      return (
        <div className="imageCrossPopUp">
          <TouchableOpacity style={Styles.imageView} onPress={closeModal}>
            <Image
              style={Styles.image}
              source={Constants.Images.Cancel}
              resizeMode={"contain"}
            />
          </TouchableOpacity>
        </div>
      );
    } else {
      return (
        <Header title={filename} hideDrawer onBackPress={this.onBackPress} />
      );
    }
  }
  onBackPress = () => {
    this.props.appAction.pop(this.props.componentId);
  };
  render() {
    const { pageNumber, numPages } = this.state;
    let { base64PrintableData } = this.props.forms;
    return (
      <DivContainer styleApp={Styles.pdfStyle} styleWeb={Styles.pdfStyle}>
        {this.cancelButtonAndHeaders(base64PrintableData.filename)}
        {Platform.OS !== "web" && (
          <Button
            onPress={() => printPDF(base64PrintableData)}
            title="Select Printer"
          />
        )}
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
  },
  imageView: {
    position: Platform.OS == "web" ? "fixed" : "absolute",
    zIndex: 100,
    top: moderateScale(20),
    right: moderateScale(30),
    height: moderateScale(20),
    width: moderateScale(20)
  },
  image: {
    ...Platform.select({
      web: {
        height: moderateScale(20),
        width: moderateScale(20)
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
