/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part for web
 */

import React from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { ScrollView } from "react-native";

const PDF = ({ onDocumentLoadSuccess, loadError, numPages, pageNumber }) => {
  return (
    <ScrollView>
      <Document
        // file="https://cors-anywhere.herokuapp.com/https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf"
        file="https://cors-anywhere.herokuapp.com/http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={loadError}
      >
        <Page pageNumber={1} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </ScrollView>
  );
};
export default PDF;
