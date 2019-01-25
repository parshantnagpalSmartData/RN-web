/**
 * Name : Parshant Nagpal
 * FileName: PrintableForms
 * Description : Contains the pdf rendering part for web
 */

import React from "react";
import { Document, Page } from "react-pdf/dist/entry.webpack";
import { Text } from "react-native";

const createTable = numPages => {
  let table = [];

  for (let i = 1; i <= numPages; i++) {
    table.push(
      <div>
        <div className={"pdfPageCount"}>
          <Text>
            {" "}
            Page {i} of {numPages}
          </Text>
        </div>
        <Page pageNumber={i} />
      </div>
    );
  }
  return table;
};

const PDF = ({
  onDocumentLoadSuccess,
  loadError,
  numPages,
  base64Data
}) => {
  return (
    <div className={"pdfpopupScroll"}>
      <Document
        // file="https://cors-anywhere.herokuapp.com/https://www.antennahouse.com/XSLsample/pdf/sample-link_1.pdf"
        // file="https://cors-anywhere.herokuapp.com/http://unec.edu.az/application/uploads/2014/12/pdf-sample.pdf"
        file={"data:application/pdf;base64," + base64Data.file}
        onLoadSuccess={onDocumentLoadSuccess}
        onLoadError={loadError}
        // renderMode={'svg'}
        scale={0.5}
      >
        {createTable(numPages)}
      </Document>
    </div>
  );
};
export default PDF;
