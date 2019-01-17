/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part
 */
import React from "react";
import { StyleSheet } from "react-native";
import Pdf from "react-native-pdf";
// import Constants from "../../../constants";
import Loader from "../../Common/Loader";
const source = {
  uri: "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
  cache: true
};

const PDF = () => {
  return (
    <Pdf
      horizontal
      enablePaging
      activityIndicator={<Loader />}
      source={source} // eslint-disable-next-line
      onLoadComplete={(numberOfPages, filePath) => {
        console.log(`number of pages: ${numberOfPages}`); // eslint-disable-line
      }} // eslint-disable-next-line
      onPageChanged={(page, numberOfPages) => {
        // eslint-disable-line
        console.log(`current page: ${page}`); // eslint-disable-line
      }} // eslint-disable-next-line
      onError={error => {}}
      style={Styles.pdf}
    />
  );
};
export default PDF;

const Styles = StyleSheet.create({
  pdf: {
    flex: 1
    // height: Constants.BaseStyle.DEVICE_HEIGHT * 0.8,
    // width: Constants.BaseStyle.DEVICE_WIDTH
  }
});
