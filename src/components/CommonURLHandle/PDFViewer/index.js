/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part
 */
import React from "react";
import { StyleSheet } from "react-native";
import Pdf from "react-native-pdf";
import Loader from "../../Common/Loader";
// const source = {
//   uri: "http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf",
//   cache: true
// };

const PDF = ({ base64Data }) => {
  return (
    <Pdf
      horizontal
      enablePaging
      activityIndicator={<Loader />}
      source={{ uri: "data:application/pdf;base64," + base64Data.file }} // eslint-disable-next-line
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
    // height : Constants.BaseStyle.DEVICE_WIDTH,
    // marginHorizontal: moderateScale(32),

    // width: Constants.BaseStyle.DEVICE_WIDTH   // width: Constants.BaseStyle.DEVICE_WIDTH
  }
});
