/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part
 */
import React from "react";
import { StyleSheet } from "react-native";
import Pdf from "react-native-pdf";
import Constants from "../../constants";

const source = {
  uri: "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
  cache: true
};

const PrintableForms = () => {
  return (
    <Pdf
      source={source}
      onLoadComplete={(numberOfPages, filePath) => {  // eslint-disable-line
        console.log(`number of pages: ${numberOfPages}`);// eslint-disable-line
      }}
      onPageChanged={(page, numberOfPages) => {// eslint-disable-line
        console.log(`current page: ${page}`);// eslint-disable-line
      }}
      onError={error => {// eslint-disable-line
        // console.log(error);// eslint-disable-line
      }}
      style={Styles.pdf}
    />
  );
};
export default PrintableForms;

const Styles = StyleSheet.create({
  pdf: {
    flex: 1,
    width: Constants.BaseStyle.DEVICE_WIDTH
  }
});
